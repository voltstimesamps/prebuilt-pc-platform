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
    it('Passes a system that meets all of the requirements', () => {
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

    it('Fails a system that does not meet category requirement', () => {
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

    it('Fails a system that exceeds price requirement', () => {
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

    it('Passes a system that meets ECC requirement', () => {
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

    it('Fails a system that does not meet minVramGb requirement', () => {
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

    it('Fails a system that does not meet minCpuScore requirement', () => {
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

    it('Fails a system that does not meet minRamGb requirement', () => {
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

    it('Fails a system that does not meet minStorageGb requirement', () => {
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

    it('Passes a system that exceeds null requirements', () => {
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