type RequirementsProfile = {
  category: "desktop" | "laptop" | "mini_pc" | "workstation" | null,
  minRamGb: number | null,
  minVramGb: number | null,
  minCpuScore: number | null,
  minStorageGb: number | null,
  eccRequired: boolean,
  integratedGraphicsOk: boolean,
  maxPriceUsd: number | null,
  portabilityImportant: boolean,
  localAiWorkloads: boolean,
  longevityYears: number | null
}

export type { RequirementsProfile }

function hardFilter(systems: any[], profile: RequirementsProfile): any[] {
  return systems.filter((system) => {
    if (profile.category && system.category !== profile.category) return false
    if (profile.minRamGb && !system.systemRam.some((entry: any) => entry.ramConfig?.capacityGb >= profile.minRamGb)) return false
    if (profile.minVramGb && !system.systemGpus.some((entry: any) => entry.gpu?.vramGb >= profile.minVramGb)) return false
    if (profile.minCpuScore && !system.systemCpus.some((entry: any) => entry.cpu?.passmarkScore >= profile.minCpuScore)) return false
    if (profile.minStorageGb && !system.systemStorage.some((entry: any) => entry.storageConfig?.capacityGb >= profile.minStorageGb)) return false
    if (profile.eccRequired &&
      !system.systemCpus.some((entry: any) => entry.cpu?.eccSupport === true) &&
      !system.systemRam.some((entry: any) => entry.ramConfig?.eccSupport === true)) return false
    if (profile.maxPriceUsd && system.priceUsd > profile.maxPriceUsd) return false
    return true
  })
}

export { hardFilter }

