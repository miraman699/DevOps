export type Feature = {
  name: string;
  label: string;
  kind: 'number' | 'category';
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  group: 'topography' | 'hydrology' | 'infrastructure' | 'solar' | 'wilderness' | 'soil';
  unit?: string;
  description?: string;
  defaultVal: number;
};

export const WILDERNESS_NAMES: Record<string, string> = {
  Wilderness_Area_1: 'Rawah Wilderness',
  Wilderness_Area_2: 'Neota Wilderness',
  Wilderness_Area_3: 'Comanche Peak Wilderness',
  Wilderness_Area_4: 'Cache la Poudre Wilderness'
};

export const SOIL_DESCRIPTIONS: Record<string, string> = {
  Soil_Type_1: '1: Cathedral family - Rock outcrop complex, extremely stony',
  Soil_Type_2: '2: Vanet - Ratake families complex, very stony',
  Soil_Type_3: '3: Haploborolls - Rock outcrop complex, rubbly',
  Soil_Type_4: '4: Ratake family - Rock outcrop complex, rubbly',
  Soil_Type_5: '5: Vanet family - Rock outcrop complex, rubbly',
  Soil_Type_6: '6: Vanet - Wetmore families rock outcrop complex, stony',
  Soil_Type_7: '7: Gothic family',
  Soil_Type_8: '8: Supervisor - Limber families complex',
  Soil_Type_9: '9: Troutville family, very stony',
  Soil_Type_10: '10: Bullwark - Catamount families - Rock outcrop complex, rubbly',
  Soil_Type_11: '11: Bullwark - Catamount families - Rock land complex, rubbly',
  Soil_Type_12: '12: Legault family - Rock land complex, stony',
  Soil_Type_13: '13: Catamount family - Rock land - Bullwark family complex, rubbly',
  Soil_Type_14: '14: Pachic Argiborolls - Aquolis complex',
  Soil_Type_15: '15: Unspecified in the USFS Soil & ELU survey',
  Soil_Type_16: '16: Cryaquolis - Cryoborolls complex',
  Soil_Type_17: '17: Gateview family - Cryaquolis complex',
  Soil_Type_18: '18: Rogert family, very stony',
  Soil_Type_19: '19: Typic Cryaquolis - Borohemists complex',
  Soil_Type_20: '20: Typic Cryaquepts - Typic Cryaquolls complex',
  Soil_Type_21: '21: Typic Cryaquolls - Leighcan family, till substratum complex',
  Soil_Type_22: '22: Leighcan family, till substratum, extremely bouldery',
  Soil_Type_23: '23: Leighcan family, till substratum - Typic Cryaquolls complex',
  Soil_Type_24: '24: Leighcan family, extremely stony',
  Soil_Type_25: '25: Leighcan family, warm, extremely stony',
  Soil_Type_26: '26: Granile - Catamount families complex, very stony',
  Soil_Type_27: '27: Leighcan family, warm - Rock outcrop complex, extremely stony',
  Soil_Type_28: '28: Leighcan family - Rock outcrop complex, extremely stony',
  Soil_Type_29: '29: Como - Legault families complex, extremely stony',
  Soil_Type_30: '30: Como family - Rock land - Legault family complex, extremely stony',
  Soil_Type_31: '31: Leighcan - Catamount families complex, extremely stony',
  Soil_Type_32: '32: Catamount family - Rock outcrop - Leighcan family complex, extremely stony',
  Soil_Type_33: '33: Leighcan - Catamount families - Rock outcrop complex, extremely stony',
  Soil_Type_34: '34: Cryorthents - Rock land complex, extremely stony',
  Soil_Type_35: '35: Cryumbrepts - Rock outcrop - Cryaquepts complex',
  Soil_Type_36: '36: Bross family - Rock land - Cryumbrepts complex, extremely stony',
  Soil_Type_37: '37: Rock outcrop - Cryumbrepts - Cryorthents complex, extremely stony',
  Soil_Type_38: '38: Leighcan - Moran families - Cryaquolls complex, extremely stony',
  Soil_Type_39: '39: Moran family - Cryorthents - Leighcan family complex, extremely stony',
  Soil_Type_40: '40: Moran family - Cryorthents - Rock land complex, extremely stony'
};

export const CONTINUOUS_FEATURES: Feature[] = [
  {
    name: 'Elevation',
    label: 'Elevation',
    kind: 'number',
    required: true,
    min: 1800,
    max: 4000,
    step: 1,
    unit: 'meters',
    group: 'topography',
    description: 'Elevation in meters above sea level (USGS 30m DEM)',
    defaultVal: 2696
  },
  {
    name: 'Aspect',
    label: 'Aspect Azimuth',
    kind: 'number',
    required: true,
    min: 0,
    max: 360,
    step: 1,
    unit: 'degrees',
    group: 'topography',
    description: 'Aspect in degrees azimuth (0° = True North, 180° = South)',
    defaultVal: 4
  },
  {
    name: 'Slope',
    label: 'Slope Angle',
    kind: 'number',
    required: true,
    min: 0,
    max: 70,
    step: 1,
    unit: 'degrees',
    group: 'topography',
    description: 'Slope steepness angle in degrees',
    defaultVal: 13
  },
  {
    name: 'Horizontal_Distance_To_Hydrology',
    label: 'Horiz. Dist. to Water',
    kind: 'number',
    required: true,
    min: 0,
    max: 2000,
    step: 1,
    unit: 'meters',
    group: 'hydrology',
    description: 'Horizontal Euclidean distance to nearest surface water feature',
    defaultVal: 30
  },
  {
    name: 'Vertical_Distance_To_Hydrology',
    label: 'Vert. Dist. to Water',
    kind: 'number',
    required: true,
    min: -200,
    max: 700,
    step: 1,
    unit: 'meters',
    group: 'hydrology',
    description: 'Vertical distance to nearest surface water feature',
    defaultVal: 10
  },
  {
    name: 'Horizontal_Distance_To_Roadways',
    label: 'Dist. to Roadways',
    kind: 'number',
    required: true,
    min: 0,
    max: 8000,
    step: 1,
    unit: 'meters',
    group: 'infrastructure',
    description: 'Horizontal distance to nearest roadway infrastructure',
    defaultVal: 2800
  },
  {
    name: 'Hillshade_9am',
    label: 'Hillshade 9am',
    kind: 'number',
    required: true,
    min: 0,
    max: 255,
    step: 1,
    unit: '0-255',
    group: 'solar',
    description: 'Hillshade solar illumination index at 9am (summer solstice)',
    defaultVal: 202
  },
  {
    name: 'Hillshade_Noon',
    label: 'Hillshade Noon',
    kind: 'number',
    required: true,
    min: 0,
    max: 255,
    step: 1,
    unit: '0-255',
    group: 'solar',
    description: 'Hillshade solar illumination index at solar noon (summer solstice)',
    defaultVal: 214
  },
  {
    name: 'Hillshade_3pm',
    label: 'Hillshade 3pm',
    kind: 'number',
    required: true,
    min: 0,
    max: 255,
    step: 1,
    unit: '0-255',
    group: 'solar',
    description: 'Hillshade solar illumination index at 3pm (summer solstice)',
    defaultVal: 148
  },
  {
    name: 'Horizontal_Distance_To_Fire_Points',
    label: 'Dist. to Wildfire Ignition',
    kind: 'number',
    required: true,
    min: 0,
    max: 8000,
    step: 1,
    unit: 'meters',
    group: 'infrastructure',
    description: 'Horizontal distance to nearest historical wildfire ignition point',
    defaultVal: 6524
  }
];

export const WILDERNESS_FEATURES: Feature[] = [1, 2, 3, 4].map(i => ({
  name: `Wilderness_Area_${i}`,
  label: WILDERNESS_NAMES[`Wilderness_Area_${i}`],
  kind: 'number' as const,
  required: true,
  min: 0,
  max: 1,
  group: 'wilderness' as const,
  unit: 'binary',
  description: `Wilderness area designation indicator for ${WILDERNESS_NAMES[`Wilderness_Area_${i}`]}`,
  defaultVal: i === 1 ? 1 : 0
}));

export const SOIL_FEATURES: Feature[] = Array.from({ length: 40 }, (_, i) => i + 1).map(i => ({
  name: `Soil_Type_${i}`,
  label: `Soil Type ${i}`,
  kind: 'number' as const,
  required: true,
  min: 0,
  max: 1,
  group: 'soil' as const,
  unit: 'binary',
  description: SOIL_DESCRIPTIONS[`Soil_Type_${i}`] || `Soil landtype code ${i}`,
  defaultVal: i === 29 ? 1 : 0
}));

// Complete 54 features strictly matching model input order
export const FEATURES: Feature[] = [
  ...CONTINUOUS_FEATURES,
  ...WILDERNESS_FEATURES,
  ...SOIL_FEATURES
];

export interface PresetProfile {
  name: string;
  tagline: string;
  expectedClass: string;
  expectedClassId: number;
  wildernessIndex: number;
  soilIndex: number;
  elevation: number;
  aspect: number;
  slope: number;
  hHydro: number;
  vHydro: number;
  roadways: number;
  shade9: number;
  shade12: number;
  shade3: number;
  fire: number;
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    name: 'Validation Sample #1',
    tagline: 'Rawah Ridge (Model Test Payload)',
    expectedClass: 'Lodgepole Pine',
    expectedClassId: 2,
    wildernessIndex: 1,
    soilIndex: 29,
    elevation: 2696,
    aspect: 4,
    slope: 13,
    hHydro: 30,
    vHydro: 10,
    roadways: 2800,
    shade9: 202,
    shade12: 214,
    shade3: 148,
    fire: 6524
  },
  {
    name: 'High Alpine Peak',
    tagline: 'Neota Wilderness Cold Glacier Rim',
    expectedClass: 'Spruce / Fir',
    expectedClassId: 1,
    wildernessIndex: 2,
    soilIndex: 38,
    elevation: 3250,
    aspect: 315,
    slope: 22,
    hHydro: 120,
    vHydro: 35,
    roadways: 1100,
    shade9: 185,
    shade12: 220,
    shade3: 170,
    fire: 2400
  },
  {
    name: 'Sub-Alpine Tundra',
    tagline: 'Krummholz Timberline Windswept',
    expectedClass: 'Krummholz',
    expectedClassId: 7,
    wildernessIndex: 2,
    soilIndex: 40,
    elevation: 3580,
    aspect: 270,
    slope: 28,
    hHydro: 250,
    vHydro: 60,
    roadways: 650,
    shade9: 160,
    shade12: 205,
    shade3: 155,
    fire: 1200
  },
  {
    name: 'Riparian Lowland',
    tagline: 'Cache la Poudre River Valley',
    expectedClass: 'Cottonwood / Willow',
    expectedClassId: 4,
    wildernessIndex: 4,
    soilIndex: 10,
    elevation: 2100,
    aspect: 90,
    slope: 6,
    hHydro: 15,
    vHydro: 2,
    roadways: 350,
    shade9: 235,
    shade12: 228,
    shade3: 130,
    fire: 850
  }
];
