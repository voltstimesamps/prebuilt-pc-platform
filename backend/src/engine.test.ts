import { describe, it, expect } from 'vitest'
import { RequirementsProfile, CategoryAverages, hardFilter, scoreSystem, rankSystems } from './engine.js'

type TestCpu = {
    passmarkScore: number | null
    eccSupport: boolean
}

type TestGpu = {
    vramGb: number
}

type TestStorageConfig = {
    capacityGb: number
}

type TestRamConfig = {
    capacityGb: number
    eccSupport: boolean
}


type TestSystemCpu = {
    cpu: TestCpu
}

type TestSystemGpu = {
    gpu: TestGpu
}

type TestSystemRamConfig = {
    ramConfig: TestRamConfig
}

type TestSystemStorageConfig = {
    storageConfig: TestStorageConfig
}


type TestSystem = {
    category?: string | null
    priceUsd?: number | null
    weightKg?: number | null
    lengthMm?: number | null
    widthMm?: number | null

    systemCpus?: TestSystemCpu[] | null
    systemGpus?: TestSystemGpu[] | null
    systemRam?: TestSystemRamConfig[] | null
    systemStorage?: TestSystemStorageConfig[] | null
}

describe('hardFilter', () => {
    it('Passes system that meets all of the requirements', () => {
        // Arrange
        const fakeSystem: TestSystem = {
            category: 'laptop',
            priceUsd: 1500,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: null,
            systemRam: null,
            systemStorage: null
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: 'laptop',
            maxPriceUsd: 1600,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(1)
    })

    it('Fails system that does not meet category requirement', () => {
        // Arrange
        const fakeSystem: TestSystem = {
            category: 'laptop',
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: null,
            systemRam: null,
            systemStorage: null
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: 'desktop',
            maxPriceUsd: null,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(0)
    })

    it('Fails system that exceeds price requirement', () => {
        // Arrange
        const fakeSystem: TestSystem = {
            category: null,
            priceUsd: 1500,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: null,
            systemRam: null,
            systemStorage: null
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: 1000,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(0)
    })

    it('Passes system that meets ECC requirement', () => {
        // Arrange
        const fakeRamConfig: TestRamConfig = {
            capacityGb: 0,
            eccSupport: true
        }
        const fakeCpu: TestCpu = {
            passmarkScore: null,
            eccSupport: true
        }
        const fakeSystemRamConfig: TestSystemRamConfig = {
            ramConfig: fakeRamConfig
        }
        const fakeSystemCpu: TestSystemCpu = {
            cpu: fakeCpu
        }
        const fakeSystem: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpu],
            systemGpus: null,
            systemRam: [fakeSystemRamConfig],
            systemStorage: null
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: null,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: true,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(1)
    })

    it('Fails system that does not meet minVramGb requirement', () => {
        // Arrange
        const fakeGpu: TestGpu = {
            vramGb: 16
        }
        const fakeSystemGpu: TestSystemGpu = {
            gpu: fakeGpu
        }
        const fakeSystem: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: [fakeSystemGpu],
            systemRam: null,
            systemStorage: null
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: null,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: 24,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(0)
    })

    it('Fails system that does not meet minCpuScore requirement', () => {
        // Arrange
        const fakeCpu: TestCpu = {
            passmarkScore: 16600,
            eccSupport: false
        }
        const fakeSystemCpu: TestSystemCpu = {
            cpu: fakeCpu
        }
        const fakeSystem: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpu],
            systemGpus: null,
            systemRam: null,
            systemStorage: null
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: null,

            minCpuScore: 24400,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(0)
    })

    it('Fails system that does not meet minRamGb requirement', () => {
        // Arrange
        const fakeRamConfig: TestRamConfig = {
            capacityGb: 8,
            eccSupport: false
        }
        const fakeSystemRamConfig: TestSystemRamConfig = {
            ramConfig: fakeRamConfig
        }
        const fakeSystem: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: null,
            systemRam: [fakeSystemRamConfig],
            systemStorage: null
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: null,

            minCpuScore: null,
            minRamGb: 16,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(0)
    })

    it('Fails system that does not meet minStorageGb requirement', () => {
        // Arrange
        const fakeStorageConfig: TestStorageConfig = {
            capacityGb: 256
        }
        const fakeSystemStorageConfig: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfig
        }
        const fakeSystem: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: null,
            systemRam: null,
            systemStorage: [fakeSystemStorageConfig]
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: null,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: 512,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(0)
    })

    it('Passes system that exceeds null requirements', () => {
        // Arrange
        const fakeRamConfig: TestRamConfig = {
            capacityGb: 16,
            eccSupport: false
        }
        const fakeSystemRamConfig: TestSystemRamConfig = {
            ramConfig: fakeRamConfig
        }
        const fakeStorageConfig: TestStorageConfig = {
            capacityGb: 256
        }
        const fakeSystemStorageConfig: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfig
        }
        const fakeSystem: TestSystem = {
            category: null,
            priceUsd: 1500,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: null,
            systemRam: [fakeSystemRamConfig],
            systemStorage: [fakeSystemStorageConfig]
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: null,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([fakeSystem], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(1)
    })

    it('Returns empty array when given no systems', () => {
        // Arrange
        const fakeRequirementsProfile: RequirementsProfile = {
            category: 'laptop',
            maxPriceUsd: 1600,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const result = (hardFilter([], fakeRequirementsProfile))
        // Assert
        expect(result).toHaveLength(0)
    })
})

describe('scoreSystem', () => {
    it('Passes if scoreSystem returns a number between 0 and 1', () => {
        // Arrange
        const fakeCpu: TestCpu = {
            passmarkScore: 16600,
            eccSupport: false
        }
        const fakeSystemCpu: TestSystemCpu = {
            cpu: fakeCpu
        }
        const fakeGpu: TestGpu = {
            vramGb: 24
        }
        const fakeSystemGpu: TestSystemGpu = {
            gpu: fakeGpu
        }
        const fakeRamConfig: TestRamConfig = {
            capacityGb: 16,
            eccSupport: false
        }
        const fakeSystemRamConfig: TestSystemRamConfig = {
            ramConfig: fakeRamConfig
        }
        const fakeStorageConfig: TestStorageConfig = {
            capacityGb: 256
        }
        const fakeSystemStorageConfig: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfig
        }
        const fakeSystem: TestSystem = {
            category: 'laptop',
            priceUsd: 1500,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpu],
            systemGpus: [fakeSystemGpu],
            systemRam: [fakeSystemRamConfig],
            systemStorage: [fakeSystemStorageConfig]
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: 'laptop',
            maxPriceUsd: 2000,

            minCpuScore: 10000,
            minRamGb: 8,
            minVramGb: 16,
            minStorageGb: 128,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }

        // Act
        const result = scoreSystem(fakeSystem, fakeRequirementsProfile, {})

        // Assert
        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThanOrEqual(1)
    })

    it('Passes if system that exceeds requirements scores higher than system that meets requirements', () => {
        // Arrange
        const fakeCpuMeets: TestCpu = {
            passmarkScore: 10000,
            eccSupport: false
        }
        const fakeSystemCpuMeets: TestSystemCpu = {
            cpu: fakeCpuMeets
        }
        const fakeGpuMeets: TestGpu = {
            vramGb: 8
        }
        const fakeSystemGpuMeets: TestSystemGpu = {
            gpu: fakeGpuMeets
        }
        const fakeRamConfigMeets: TestRamConfig = {
            capacityGb: 16,
            eccSupport: false
        }
        const fakeSystemRamConfigMeets: TestSystemRamConfig = {
            ramConfig: fakeRamConfigMeets
        }
        const fakeStorageConfigMeets: TestStorageConfig = {
            capacityGb: 256
        }
        const fakeSystemStorageConfigMeets: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfigMeets
        }
        const fakeSystemMeets: TestSystem = {
            category: 'laptop',
            priceUsd: 1500,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpuMeets],
            systemGpus: [fakeSystemGpuMeets],
            systemRam: [fakeSystemRamConfigMeets],
            systemStorage: [fakeSystemStorageConfigMeets]
        }

        const fakeCpuExceeds: TestCpu = {
            passmarkScore: 15000,
            eccSupport: false
        }
        const fakeSystemCpuExceeds: TestSystemCpu = {
            cpu: fakeCpuExceeds
        }
        const fakeGpuExceeds: TestGpu = {
            vramGb: 16
        }
        const fakeSystemGpuExceeds: TestSystemGpu = {
            gpu: fakeGpuExceeds
        }
        const fakeRamConfigExceeds: TestRamConfig = {
            capacityGb: 32,
            eccSupport: false
        }
        const fakeSystemRamConfigExceeds: TestSystemRamConfig = {
            ramConfig: fakeRamConfigExceeds
        }
        const fakeStorageConfigExceeds: TestStorageConfig = {
            capacityGb: 512
        }
        const fakeSystemStorageConfigExceeds: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfigExceeds
        }
        const fakeSystemExceeds: TestSystem = {
            category: 'laptop',
            priceUsd: 1000,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpuExceeds],
            systemGpus: [fakeSystemGpuExceeds],
            systemRam: [fakeSystemRamConfigExceeds],
            systemStorage: [fakeSystemStorageConfigExceeds]
        }

        const fakeRequirementsProfile: RequirementsProfile = {
            category: 'laptop',
            maxPriceUsd: 1500,

            minCpuScore: 10000,
            minRamGb: 16,
            minVramGb: 8,
            minStorageGb: 256,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }

        // Act
        const resultMeets = scoreSystem(fakeSystemMeets, fakeRequirementsProfile, {})
        const resultExceeds = scoreSystem(fakeSystemExceeds, fakeRequirementsProfile, {})
        // Assert
        expect(resultExceeds).toBeGreaterThan(resultMeets)
    })
    it('Passes if cheaper system scores higher than system at budget price', () => {
        // Arrange
        const fakeSystemCheaper: TestSystem = {
            priceUsd: 1000
        }
        const fakeSystemExpensive: TestSystem = {
            priceUsd: 1500
        }
        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: 1600,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const returnCheaper = scoreSystem(fakeSystemCheaper, fakeRequirementsProfile, {})
        const returnExpensive = scoreSystem(fakeSystemExpensive, fakeRequirementsProfile, {})
        // Assert
        expect(returnCheaper).toBeGreaterThan(returnExpensive)
    })
    it('Passes if localAiWorkloads causes high vramGb to outscore low vramGb', () => {
        // Arrange
        const fakeGpuLow: TestGpu = {
            vramGb: 16
        }
        const fakeSystemGpuLow: TestSystemGpu = {
            gpu: fakeGpuLow
        }
        const fakeSystemLow: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: [fakeSystemGpuLow],
            systemRam: null,
            systemStorage: null
        }

        const fakeGpuHigh: TestGpu = {
            vramGb: 32
        }
        const fakeSystemGpuHigh: TestSystemGpu = {
            gpu: fakeGpuHigh
        }
        const fakeSystemHigh: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: [fakeSystemGpuHigh],
            systemRam: null,
            systemStorage: null
        }

        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: null,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: 20,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: true,
            longevityYears: null
        }
        // Act
        const resultLow = scoreSystem(fakeSystemLow, fakeRequirementsProfile, {})
        const resultHigh = scoreSystem(fakeSystemHigh, fakeRequirementsProfile, {})
        // Assert
        expect(resultHigh).toBeGreaterThan(resultLow)
    })
    it('Passes if localAiWorkloads: false means that vramGb has no impact on score', () => {
        // Arrange
        const fakeGpuLow: TestGpu = {
            vramGb: 16
        }
        const fakeSystemGpuLow: TestSystemGpu = {
            gpu: fakeGpuLow
        }
        const fakeSystemLow: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: [fakeSystemGpuLow],
            systemRam: null,
            systemStorage: null
        }

        const fakeGpuHigh: TestGpu = {
            vramGb: 32
        }
        const fakeSystemGpuHigh: TestSystemGpu = {
            gpu: fakeGpuHigh
        }
        const fakeSystemHigh: TestSystem = {
            category: null,
            priceUsd: null,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: null,
            systemGpus: [fakeSystemGpuHigh],
            systemRam: null,
            systemStorage: null
        }

        const fakeRequirementsProfile: RequirementsProfile = {
            category: null,
            maxPriceUsd: null,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: 8,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const resultLow = scoreSystem(fakeSystemLow, fakeRequirementsProfile, {})
        const resultHigh = scoreSystem(fakeSystemHigh, fakeRequirementsProfile, {})
        // Assert
        expect(resultHigh).toBe(resultLow)
    })
})