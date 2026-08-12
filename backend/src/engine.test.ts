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

describe('rankSystem', () => {
    it('Passes if system with higher score is ranked higher than system with lower score', () => {
        // Arrange
        const fakeCpuLow: TestCpu = {
            passmarkScore: 10000,
            eccSupport: false
        }
        const fakeSystemCpuLow: TestSystemCpu = {
            cpu: fakeCpuLow
        }
        const fakeGpuLow: TestGpu = {
            vramGb: 16
        }
        const fakeSystemGpuLow: TestSystemGpu = {
            gpu: fakeGpuLow
        }
        const fakeStorageConfigLow: TestStorageConfig = {
            capacityGb: 256
        }
        const fakeSystemStorageConfigLow: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfigLow
        }
        const fakeRamConfigLow: TestRamConfig = {
            capacityGb: 16,
            eccSupport: false
        }
        const fakeSystemRamConfigLow: TestSystemRamConfig = {
            ramConfig: fakeRamConfigLow
        }
        const fakeSystemLow: TestSystem = {
            category: 'laptop',
            priceUsd: 1000,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpuLow],
            systemGpus: [fakeSystemGpuLow],
            systemRam: [fakeSystemRamConfigLow],
            systemStorage: [fakeSystemStorageConfigLow]
        }
        const fakeCpuHigh: TestCpu = {
            passmarkScore: 20000,
            eccSupport: false
        }
        const fakeSystemCpuHigh: TestSystemCpu = {
            cpu: fakeCpuHigh
        }
        const fakeGpuHigh: TestGpu = {
            vramGb: 32
        }
        const fakeSystemGpuHigh: TestSystemGpu = {
            gpu: fakeGpuHigh
        }
        const fakeStorageConfigHigh: TestStorageConfig = {
            capacityGb: 512
        }
        const fakeSystemStorageConfigHigh: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfigHigh
        }
        const fakeRamConfigHigh: TestRamConfig = {
            capacityGb: 32,
            eccSupport: false
        }
        const fakeSystemRamConfigHigh: TestSystemRamConfig = {
            ramConfig: fakeRamConfigHigh
        }
        const fakeSystemHigh: TestSystem = {
            category: 'laptop',
            priceUsd: 800,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpuHigh],
            systemGpus: [fakeSystemGpuHigh],
            systemRam: [fakeSystemRamConfigHigh],
            systemStorage: [fakeSystemStorageConfigHigh]
        }

        const fakeRequirementsProfile: RequirementsProfile = {
            category: 'laptop',
            maxPriceUsd: 1500,

            minCpuScore: 5000,
            minRamGb: 4,
            minVramGb: 8,
            minStorageGb: 128,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const rankedList = rankSystems([fakeSystemLow, fakeSystemHigh], fakeRequirementsProfile, {})
        // Assert
        expect(rankedList[0]).toBe(fakeSystemHigh)
        expect(rankedList[1]).toBe(fakeSystemLow)
    })
    it('Passes if system that fails hardFilter does not appear in rankedList', () => {
        // Arrange
        const fakeCpuFail: TestCpu = {
            passmarkScore: 10000,
            eccSupport: false
        }
        const fakeSystemCpuFail: TestSystemCpu = {
            cpu: fakeCpuFail
        }
        const fakeGpuFail: TestGpu = {
            vramGb: 16
        }
        const fakeSystemGpuFail: TestSystemGpu = {
            gpu: fakeGpuFail
        }
        const fakeStorageConfigFail: TestStorageConfig = {
            capacityGb: 256
        }
        const fakeSystemStorageConfigFail: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfigFail
        }
        const fakeRamConfigFail: TestRamConfig = {
            capacityGb: 8,
            eccSupport: false
        }
        const fakeSystemRamConfigFail: TestSystemRamConfig = {
            ramConfig: fakeRamConfigFail
        }
        const fakeSystemFail: TestSystem = {
            category: 'laptop',
            priceUsd: 1000,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpuFail],
            systemGpus: [fakeSystemGpuFail],
            systemRam: [fakeSystemRamConfigFail],
            systemStorage: [fakeSystemStorageConfigFail]
        }

        const fakeCpuPass: TestCpu = {
            passmarkScore: 20000,
            eccSupport: false
        }
        const fakeSystemCpuPass: TestSystemCpu = {
            cpu: fakeCpuPass
        }
        const fakeGpuPass: TestGpu = {
            vramGb: 32
        }
        const fakeSystemGpuPass: TestSystemGpu = {
            gpu: fakeGpuPass
        }
        const fakeStorageConfigPass: TestStorageConfig = {
            capacityGb: 512
        }
        const fakeSystemStorageConfigPass: TestSystemStorageConfig = {
            storageConfig: fakeStorageConfigPass
        }
        const fakeRamConfigPass: TestRamConfig = {
            capacityGb: 32,
            eccSupport: false
        }
        const fakeSystemRamConfigPass: TestSystemRamConfig = {
            ramConfig: fakeRamConfigPass
        }
        const fakeSystemPass: TestSystem = {
            category: 'laptop',
            priceUsd: 800,
            weightKg: null,

            lengthMm: null,
            widthMm: null,
            systemCpus: [fakeSystemCpuPass],
            systemGpus: [fakeSystemGpuPass],
            systemRam: [fakeSystemRamConfigPass],
            systemStorage: [fakeSystemStorageConfigPass]
        }

        const fakeRequirementsProfile: RequirementsProfile = {
            category: 'laptop',
            maxPriceUsd: 1500,

            minCpuScore: 5000,
            minRamGb: 16,
            minVramGb: 24,
            minStorageGb: 324,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: false,
            localAiWorkloads: false,
            longevityYears: null
        }
        // Act
        const rankedList = rankSystems([fakeSystemFail, fakeSystemPass], fakeRequirementsProfile, {})
        // Assert
        expect(rankedList).toHaveLength(1)
    })
    it('Passes if smaller system outranks bigger system when portabilityImportant', () => {
        // Arrange
        const fakeSystemLow: TestSystem = {
            category: 'laptop',
            priceUsd: 1000,
            weightKg: 1,

            lengthMm: 312,
            widthMm: 216,
            systemCpus: null,
            systemGpus: null,
            systemRam: null,
            systemStorage: null
        }

        const fakeSystemHigh: TestSystem = {
            category: 'laptop',
            priceUsd: 1000,
            weightKg: 0.9,

            lengthMm: 300,
            widthMm: 200,
            systemCpus: null,
            systemGpus: null,
            systemRam: null,
            systemStorage: null
        }

        const fakeRequirementsProfile: RequirementsProfile = {
            category: 'laptop',
            maxPriceUsd: 1500,

            minCpuScore: null,
            minRamGb: null,
            minVramGb: null,
            minStorageGb: null,
            eccRequired: false,
            integratedGraphicsOk: true,
            portabilityImportant: true,
            localAiWorkloads: false,
            longevityYears: null
        }

        const fakeCategoryAvgs: CategoryAverages = {
            laptop: {
                avgWeightKg: 2,
                avgLengthMm: 300,
                avgWidthMm: 220
            }
        }
        // Act
        const rankedList = rankSystems([fakeSystemLow, fakeSystemHigh], fakeRequirementsProfile, fakeCategoryAvgs)
        // Assert
        expect(rankedList[0]).toBe(fakeSystemHigh)
    })
})