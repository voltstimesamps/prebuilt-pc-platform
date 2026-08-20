export type SystemCategory =  "desktop" | "laptop" | "mini_pc" | "workstation"
export type OsPreference = "windows" | "macos" | "linux" | null

export interface RequirementsProfile {
  category: SystemCategory | null;
  osPreference: OsPreference;
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
    category: SystemCategory;
    budgetUsd: number;
    longevityYears: number;
    osPreference: OsPreference;
    selectedTileIds: string[];
    gamingStyle: "regular" | "competitive" | "demanding" | null;
    targetResolution: "1080p" | "1440p" | "4k" | null;
    aiModelSize: "small" | "mid" | "large" | null
}