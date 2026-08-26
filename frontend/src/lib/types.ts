export type SystemCategory =  "desktop" | "laptop" | "mini_pc" | "workstation"
export type OsPreference = "windows" | "macos" | "linux" | "none"
export type QuestionnaireStep = "category" | "budget" | "longevity" | "os" | "tiles" | "gaming_style" | "target_resolution" | "ai_model_size" | null
export type GamingStyle = "regular" | "competitive" | "demanding" | null
export type TargetResolution = "4k" | "1440p" | "1080p" | null
export type AiModelSize = "large" | "mid" | "small" | null

export interface RequirementsProfile {
  category: SystemCategory | null;
  osPreference: OsPreference | null;
  minRamGb: number | null;
  minVramGb: number | null;
  minCpuScore: number | null;
  minStorageGb: number | null;
  eccRequired: boolean;
  integratedGraphicsOk: boolean;
  maxPriceUsd: number | null;
  portabilityImportant: boolean;
  localAiWorkloads: boolean;
  longevityYears: number | null
}

export interface QuestionnaireAnswers {
    category: SystemCategory | null;
    budgetUsd: number | null;
    longevityYears: number | null;
    osPreference: OsPreference | null;
    selectedTileIds: string[];
    gamingStyle?: GamingStyle;
    targetResolution?: "1080p" | "1440p" | "4k" | null;
    aiModelSize?: "small" | "mid" | "large" | null
}

type OsType = "windows" | "macos" | "linux"
export interface Manufacturer {
  id: number;
  name: string;
  website: string | null;
}
export interface Cpu {
  id: number;
  manufacturerId: number;
  name: string;
  baseClockGhz: number;
  boostClockGhz: number | null;
  passmarkScore: number | null;
  eccSupport: boolean;
  integratedGraphics: boolean;
  tdpWatts: number | null
}
export interface Gpu {
  id: number;
  manufacturerId: number;
  name: string;
  vramGb: number;
  passmarkScore: number | null;
  tdpWatts: number| null;
  isIntegrated: boolean
}
export interface RamConfig {
  id: number;
  capacityGb: number;
  type: string;
  eccSupport: boolean
}
export interface StorageConfig {
  id: number;
  capacityGb: number;
  type: string
}
export interface SystemCpu {
  id: number;
  systemId: number;
  cpuId: number;
  cpu: Cpu
}
export interface SystemGpu {
  id: number;
  systemId: number;
  gpuId: number;
  gpu: Gpu
}
export interface SystemRam {
  id: number;
  systemId: number;
  ramConfigId: number;
  ramConfig: RamConfig
}
export interface SystemStorage {
  id: number;
  systemId: number;
  storageConfigId: number;
  storageConfig: StorageConfig
}
export interface System {
  id: number;
  manufacturerId: number;
  name: string;
  category: SystemCategory;
  lengthMm: number | null;
  widthMm: number | null;
  depthMm: number | null;
  screenResolutionX: number | null;
  screenResolutionY: number | null;
  weightKg: number | null;
  os: OsType;
  linuxCompatible: boolean | null;
  priceUsd: number;
  releaseYear: number | null;
  url: string | null;
  active: boolean

  systemCpus: SystemCpu[];
  systemGpus: SystemGpu[];
  systemRam: SystemRam[];
  systemStorage: SystemStorage[]
}