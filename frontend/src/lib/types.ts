export type SystemCategory =  "desktop" | "laptop" | "mini_pc" | "workstation"
export type OsPreference = "windows" | "macos" | "linux" | "none"
export type QuestionnaireStep = "category" | "budget" | "longevity" | "os" | "tiles" | "gaming_style" | "target_resolution" | "ai_model_size" | null
export type GamingStyle = "regular" | "competitive" | "demanding" | null
export type TargetResolution = "4k" | "1440p" | "1080p" | null

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