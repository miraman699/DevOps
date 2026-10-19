import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClassProbability {
  class_id: number;
  label: string;
  probability: number;
}

export interface PredictionResponse {
  prediction: string | number;
  predicted_class?: number;
  class_name?: string;
  task: string;
  probabilities?: number[];
  class_probabilities?: ClassProbability[];
  disclaimer?: string;
}

export interface HealthResponse {
  status: string;
  features: number;
  task: string;
  dataset?: string;
  classes?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class PredictionService {
  private http = inject(HttpClient);

  checkHealth(): Observable<HealthResponse> {
    return this.http.get<HealthResponse>('/api/health');
  }

  predict(payload: Record<string, string | number>): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>('/api/predict', payload);
  }
}
