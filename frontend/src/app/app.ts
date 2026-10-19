import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FEATURES,
  CONTINUOUS_FEATURES,
  WILDERNESS_FEATURES,
  SOIL_FEATURES,
  WILDERNESS_NAMES,
  SOIL_DESCRIPTIONS,
  PRESET_PROFILES,
  PresetProfile,
  Feature
} from './feature-schema';
import {
  PredictionService,
  PredictionResponse,
  HealthResponse
} from './prediction.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly fields = FEATURES;
  readonly continuousFields = CONTINUOUS_FEATURES;
  readonly wildernessFields = WILDERNESS_FEATURES;
  readonly soilFields = SOIL_FEATURES;
  readonly wildernessNames = WILDERNESS_NAMES;
  readonly soilDescriptions = SOIL_DESCRIPTIONS;
  readonly presets = PRESET_PROFILES;

  readonly deployedStatic = typeof window !== 'undefined'
    ? !['localhost', '127.0.0.1'].includes(window.location.hostname)
    : false;

  // Form values (all 54 features)
  values: Record<string, number | null> = {};

  // Form state
  selectedWilderness = 1; // 1 to 4
  selectedSoil = 29; // 1 to 40
  loading = false;
  error = '';
  serverConnected: boolean | null = null;
  serverInfo: HealthResponse | null = null;
  result: PredictionResponse | null = null;
  activePresetName = 'Validation Sample #1';

  private api = inject(PredictionService);

  ngOnInit() {
    this.applyPreset(this.presets[0]);
    if (!this.deployedStatic) {
      this.checkServerHealth();
    }
  }

  checkServerHealth() {
    this.api.checkHealth().subscribe({
      next: res => {
        this.serverConnected = true;
        this.serverInfo = res;
      },
      error: () => {
        this.serverConnected = false;
      }
    });
  }

  applyPreset(preset: PresetProfile) {
    this.activePresetName = preset.name;
    this.error = '';
    this.result = null;

    // Set continuous values
    this.values['Elevation'] = preset.elevation;
    this.values['Aspect'] = preset.aspect;
    this.values['Slope'] = preset.slope;
    this.values['Horizontal_Distance_To_Hydrology'] = preset.hHydro;
    this.values['Vertical_Distance_To_Hydrology'] = preset.vHydro;
    this.values['Horizontal_Distance_To_Roadways'] = preset.roadways;
    this.values['Hillshade_9am'] = preset.shade9;
    this.values['Hillshade_Noon'] = preset.shade12;
    this.values['Hillshade_3pm'] = preset.shade3;
    this.values['Horizontal_Distance_To_Fire_Points'] = preset.fire;

    // Set wilderness
    this.selectedWilderness = preset.wildernessIndex;
    this.syncWildernessAreas();

    // Set soil
    this.selectedSoil = preset.soilIndex;
    this.syncSoilTypes();
  }

  onWildernessChange(index: number) {
    this.selectedWilderness = index;
    this.syncWildernessAreas();
  }

  onSoilChange(index: number) {
    this.selectedSoil = Number(index);
    this.syncSoilTypes();
  }

  private syncWildernessAreas() {
    for (let i = 1; i <= 4; i++) {
      this.values[`Wilderness_Area_${i}`] = i === this.selectedWilderness ? 1 : 0;
    }
  }

  private syncSoilTypes() {
    for (let i = 1; i <= 40; i++) {
      this.values[`Soil_Type_${i}`] = i === this.selectedSoil ? 1 : 0;
    }
  }

  get computedEuclideanWaterDistance(): number {
    const h = Number(this.values['Horizontal_Distance_To_Hydrology'] || 0);
    const v = Number(this.values['Vertical_Distance_To_Hydrology'] || 0);
    return Math.round(Math.sqrt(h * h + v * v));
  }

  get aspectCompassDirection(): string {
    const deg = Number(this.values['Aspect'] || 0);
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const idx = Math.round(deg / 45) % 8;
    return `${dirs[idx]} (${deg}°)`;
  }

  getSoilKeys(): number[] {
    return Array.from({ length: 40 }, (_, i) => i + 1);
  }

  submit() {
    this.error = '';
    this.result = null;

    if (this.deployedStatic) {
      this.error = 'Static GitHub Pages demonstration: Launch Flask and Angular locally for live model predictions.';
      return;
    }

    // Build payload ensuring all 54 features are present
    const payload: Record<string, number> = {};
    for (const field of this.fields) {
      const val = this.values[field.name];
      if (val === null || val === undefined || isNaN(Number(val))) {
        this.error = `Please provide a valid value for ${field.label}`;
        return;
      }
      payload[field.name] = Number(val);
    }

    this.loading = true;
    this.api.predict(payload).subscribe({
      next: res => {
        this.result = res;
        this.loading = false;
        this.serverConnected = true;
      },
      error: err => {
        this.loading = false;
        this.serverConnected = false;
        this.error = `Inference API Error (${err.status || 'Offline'}): ${
          err.error?.error || err.error?.detail || err.message || 'Check local Flask terminal at 127.0.0.1:5000'
        }`;
      }
    });
  }
}
