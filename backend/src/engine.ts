type RequirementsProfile = {
  category: "desktop" | "laptop" | "mini_pc" | "workstation" | null,
  osPreference: "windows" | "macos" | "linux" | null,
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

type CategoryAverages = {
  [category: string]: {
    avgWeightKg: number
    avgLengthMm: number
    avgWidthMm: number
  }
}

export type { RequirementsProfile }
export type { CategoryAverages }

function hardFilter(systems: any[], profile: RequirementsProfile): any[] {
  return systems.filter((system) => {
    if (profile.category && system.category !== profile.category) {
      return false
    }
    if (profile.osPreference && system.os !== profile.osPreference) {
      return false
    }
    if (profile.minRamGb && !system.systemRam.some((entry: any) => entry.ramConfig?.capacityGb >= profile.minRamGb)) {
      return false
    }
    if (profile.minVramGb && !system.systemGpus.some((entry: any) => entry.gpu?.vramGb >= profile.minVramGb)) {
      return false
    }
    if (profile.minCpuScore && !system.systemCpus.some((entry: any) => entry.cpu?.passmarkScore >= profile.minCpuScore)) {
      return false
    }
    if (profile.minStorageGb && !system.systemStorage.some((entry: any) => entry.storageConfig?.capacityGb >= profile.minStorageGb)) {
      return false
    }
    if (profile.eccRequired &&
      !system.systemCpus.some((entry: any) => entry.cpu?.eccSupport === true) &&
      !system.systemRam.some((entry: any) => entry.ramConfig?.eccSupport === true)) {
      return false
    }
    if (profile.maxPriceUsd && system.priceUsd > profile.maxPriceUsd) {
      return false
    }
    return true
  })
}

export { hardFilter }

function scoreSystem(system: any, profile: RequirementsProfile, categoryAverages: CategoryAverages) {
  let maxScore = 0
  let score = 0
  const cpuWeight = 0.25
  const vramWeight = 0.30
  const priceWeight = 0.20
  const ramWeight = 0.10
  const storageWeight = 0.05
  const dimensionWeight = 0.10

  const averages = categoryAverages[system.category]
  if (profile.minCpuScore) {
    maxScore += cpuWeight
    score += cpuWeight * Math.min((system.systemCpus[0]?.cpu?.passmarkScore / profile.minCpuScore), 1)
  }
  if (profile.localAiWorkloads) {
    maxScore += vramWeight
    score += Math.min((vramWeight * (system.systemGpus[0]?.gpu?.vramGb / profile.minVramGb)), vramWeight)
  }
  if (profile.maxPriceUsd) {
    maxScore += priceWeight
    score += priceWeight * Math.min(((profile.maxPriceUsd - system.priceUsd) / profile.maxPriceUsd), 1)
  }
  if (profile.minRamGb) {
    maxScore += ramWeight
    score += ramWeight * Math.min((system.systemRam[0]?.ramConfig?.capacityGb / profile.minRamGb), 1)
  }
  if (profile.minStorageGb) {
    maxScore += storageWeight
    score += storageWeight * Math.min((system.systemStorage[0]?.storageConfig?.capacityGb / profile.minStorageGb), 1)
  }
  if (profile.portabilityImportant) {
    maxScore += dimensionWeight
    const weightRatio = (averages.avgWeightKg / system.weightKg)
    const dimensionRatio = (averages.avgLengthMm * averages.avgWidthMm) / (system.lengthMm * system.widthMm)
    score += dimensionWeight * ((weightRatio + dimensionRatio) / 2)
  }

  return maxScore > 0 ? score / maxScore : 0
}

export { scoreSystem }

function rankSystems(systems: any[], profile: RequirementsProfile, categoryAverages: CategoryAverages) {
  const filteredList = hardFilter(systems, profile)
  const scoredList = filteredList.map((system) => ({
    system,
    score: scoreSystem(system, profile, categoryAverages)
  }))
  scoredList.sort((a, b) => b.score - a.score)
  const finalList = scoredList.map((entry) => entry.system)
  return finalList
}

export { rankSystems }