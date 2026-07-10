import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });
async function main() {
    console.log("Seeding database...")

    //manufactuers

    const apple = await prisma.manufacturer.upsert({
        where: { name: "Apple" },
        update: {},
        create: { name: "Apple", website: "https://www.apple.com" }
    })
    const nvidia = await prisma.manufacturer.upsert({
        where: { name: "Nvidia" },
        update: {},
        create: { name: "Nvidia", website: 'https://www.nvidia.com' }
    })
    const lenovo = await prisma.manufacturer.upsert({
        where: { name: "Lenovo" },
        update: {},
        create: { name: "Lenovo", website: "https://www.lenovo.com" }
    })
    const dell = await prisma.manufacturer.upsert({
        where: { name: "Dell" },
        update: {},
        create: { name: "Dell", website: "https://www.dell.com" }
    })
    const hp = await prisma.manufacturer.upsert({
        where: { name: "HP" },
        update: {},
        create: { name: "HP", website: "https://www.hp.com" }
    })
    const beelink = await prisma.manufacturer.upsert({
        where: { name: "Beelink" },
        update: {},
        create: { name: "Beelink", website: "https://www.bee-link.com" }
    })
    const minisforum = await prisma.manufacturer.upsert({
        where: { name: "Minisforum" },
        update: {},
        create: { name: "Minisforum", website: "https://www.minisforum.com" }
    })
    const intel = await prisma.manufacturer.upsert({
        where: { name: "Intel" },
        update: {},
        create: { name: "Intel", website: "https://www.intel.com" }
    })
    const amd = await prisma.manufacturer.upsert({
        where: { name: "AMD" },
        update: {},
        create: { name: "AMD", website: "https://www.amd.com" }
    })

    console.log("Manufacturers seeded")

    //cpus

    const apple_M4_10_Core = await prisma.cpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 10-Core", baseClockGhz: 3.5, boostClockGhz: 4.4, passmarkScore: 15200, eccSupport: false, integratedGraphics: true, tdpWatts: 20 }
    })
    const apple_M4_Pro_12_Core = await prisma.cpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 Pro 12-Core", baseClockGhz: 3.5, boostClockGhz: 4.5, passmarkScore: 24800, eccSupport: false, integratedGraphics: true, tdpWatts: 30 }
    })
    const apple_M4_Pro_14_Core = await prisma.cpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 Pro 14-Core", baseClockGhz: 3.5, boostClockGhz: 4.5, passmarkScore: 27500, eccSupport: false, integratedGraphics: true, tdpWatts: 35 }
    })
    const apple_M4_Max_14_Core = await prisma.cpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 Max 14-Core", baseClockGhz: 3.5, boostClockGhz: 4.5, passmarkScore: 29800, eccSupport: false, integratedGraphics: true, tdpWatts: 50 }
    })
    const apple_M4_Max_16_Core = await prisma.cpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 Max 16-Core", baseClockGhz: 3.5, boostClockGhz: 4.5, passmarkScore: 32100, eccSupport: false, integratedGraphics: true, tdpWatts: 65 }
    })
    const apple_M2_Ultra_24_Core = await prisma.cpu.create({
        data: { manufacturerId: apple.id, name: "Apple M2 Ultra 24-Core", baseClockGhz: 3.5, boostClockGhz: 4.0, passmarkScore: 38000, eccSupport: false, integratedGraphics: true, tdpWatts: 120 }
    })
    const nvidia_GB10_Grace_20_Core = await prisma.cpu.create({
        data: { manufacturerId: nvidia.id, name: "Nvidia GB10 Grace (20-Core ARM)", baseClockGhz: 2.6, boostClockGhz: 3.3, passmarkScore: null, eccSupport: false, integratedGraphics: false, tdpWatts: 60 }
    })
    const intel_i7_14700F = await prisma.cpu.create({
        data: { manufacturerId: intel.id, name: "Intel Core i7-14700F", baseClockGhz: 2.1, boostClockGhz: 5.4, passmarkScore: 36900, eccSupport: false, integratedGraphics: false, tdpWatts: 65 }
    })
    const intel_i7_14700 = await prisma.cpu.create({
        data: { manufacturerId: intel.id, name: "Intel Core i7-14700", baseClockGhz: 2.1, boostClockGhz: 5.4, passmarkScore: 37200, eccSupport: false, integratedGraphics: false, tdpWatts: 65 }
    })
    const intel_Xeon_w5_2445 = await prisma.cpu.create({
        data: { manufacturerId: intel.id, name: "Intel Xeon w5-2445", baseClockGhz: 3.1, boostClockGhz: 4.6, passmarkScore: 22100, eccSupport: true, integratedGraphics: false, tdpWatts: 225 }
    })
    const intel_i9_13900 = await prisma.cpu.create({
        data: { manufacturerId: intel.id, name: "Intel Core i9-13900", baseClockGhz: 2.0, boostClockGhz: 5.6, passmarkScore: 45000, eccSupport: false, integratedGraphics: true, tdpWatts: 65 }
    })
    const intel_i7_13700H = await prisma.cpu.create({
        data: { manufacturerId: intel.id, name: "Intel Core i7-13700H", baseClockGhz: 2.4, boostClockGhz: 5.0, passmarkScore: 26800, eccSupport: false, integratedGraphics: true, tdpWatts: 45 }
    })
    const intel_Ultra7_265 = await prisma.cpu.create({
        data: { manufacturerId: intel.id, name: "Intel Core Ultra 7 265", baseClockGhz: 2.4, boostClockGhz: 5.4, passmarkScore: 49732, eccSupport: false, integratedGraphics: true, tdpWatts: 45 }
    })
    const intel_i7_1365U = await prisma.cpu.create({
        data: { manufacturerId: intel.id, name: "Intel Core i7-1365U", baseClockGhz: 1.8, boostClockGhz: 5.2, passmarkScore: 11900, eccSupport: false, integratedGraphics: true, tdpWatts: 65 }
    })
    const amd_Ryzen9_6900HX = await prisma.cpu.create({
        data: { manufacturerId: amd.id, name: "AMD Ryzen 9 6900HX", baseClockGhz: 3.3, boostClockGhz: 4.9, passmarkScore: 19200, eccSupport: false, integratedGraphics: true, tdpWatts: 45 }
    })
    const amd_Ryzen9_8945HS = await prisma.cpu.create({
        data: { manufacturerId: amd.id, name: "AMD Ryzen 9 8945HS", baseClockGhz: 4.0, boostClockGhz: 5.2, passmarkScore: 30200, eccSupport: false, integratedGraphics: true, tdpWatts: 45 }
    })

    console.log("CPUs seeded")

    //gpus

    const apple_M4_10_Core_gpu = await prisma.gpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 10-Core GPU", vramGb: 16, passmarkScore: null, tdpWatts: null, isIntegrated: true }
    })
    const apple_M4_Pro_16_Core_gpu = await prisma.gpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 Pro 16-Core GPU", vramGb: 24, passmarkScore: null, tdpWatts: null, isIntegrated: true }
    })
    const apple_M4_Pro_20_Core_gpu = await prisma.gpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 Pro 20-Core GPU", vramGb: 24, passmarkScore: null, tdpWatts: null, isIntegrated: true }
    })
    const apple_M4_Max_32_Core_gpu = await prisma.gpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 Max 32-Core GPU", vramGb: 36, passmarkScore: null, tdpWatts: null, isIntegrated: true }
    })
    const apple_M4_Max_40_Core_gpu = await prisma.gpu.create({
        data: { manufacturerId: apple.id, name: "Apple M4 Max 40-Core GPU", vramGb: 36, passmarkScore: null, tdpWatts: null, isIntegrated: true }
    })
    const apple_M2_Ultra_60_Core_gpu = await prisma.gpu.create({
        data: { manufacturerId: apple.id, name: "Apple M2 Ultra 60-Core GPU", vramGb: 64, passmarkScore: null, tdpWatts: null, isIntegrated: true }
    })
    const nvidia_Blackwell_GB10_gpu = await prisma.gpu.create({
        data: { manufacturerId: nvidia.id, name: "Nvidia Blackwell GB10 GPU", vramGb: 128, passmarkScore: null, tdpWatts: 60, isIntegrated: false }
    })
    const nvidia_GeForce_RTX_4070_Super = await prisma.gpu.create({
        data: { manufacturerId: nvidia.id, name: "Nvidia GeForce RTX 4070 Super", vramGb: 12, passmarkScore: 22600, tdpWatts: 220, isIntegrated: false }
    })
    const nvidia_GeForce_RTX_3050 = await prisma.gpu.create({
        data: { manufacturerId: nvidia.id, name: "Nvidia GeForce RTX 3050", vramGb: 8, passmarkScore: 9900, tdpWatts: 130, isIntegrated: false }
    })
    const nvidia_GeForce_RTX_4000_sff_Ada = await prisma.gpu.create({
        data: { manufacturerId: nvidia.id, name: "Nvidia RTX 4000 SFF Ada", vramGb: 20, passmarkScore: 15200, tdpWatts: 70, isIntegrated: false }
    })
    const nvidia_T1000 = await prisma.gpu.create({
        data: { manufacturerId: nvidia.id, name: "Nvidia T1000", vramGb: 8, passmarkScore: 4400, tdpWatts: 50, isIntegrated: false }
    })
    const intel_Iris_Xe_i7_1365U = await prisma.gpu.create({
        data: { manufacturerId: intel.id, name: "Intel Iris Xe Graphics (i7-1365U)", vramGb: 2, passmarkScore: null, tdpWatts: 15, isIntegrated: true }
    })
    const intel_UHD_770 = await prisma.gpu.create({
        data: { manufacturerId: intel.id, name: "Intel UHD Graphics 770", vramGb: 2, passmarkScore: null, tdpWatts: 65, isIntegrated: true }
    })
    const amd_Radeon_680M = await prisma.gpu.create({
        data: { manufacturerId: amd.id, name: "AMD Radeon 680M", vramGb: 2, passmarkScore: 3800, tdpWatts: 45, isIntegrated: true }
    })
    const amd_Radeon_780M = await prisma.gpu.create({
        data: { manufacturerId: amd.id, name: "AMD Radeon 780M", vramGb: 2, passmarkScore: 5100, tdpWatts: 45, isIntegrated: true }
    })

    console.log("GPUs seeded")

    //ram-configs

    const ram_16GB_LPDDR5 = await prisma.ramConfig.create({
        data: { capacityGb: 16, type: "LPDDR5", eccSupport: false }
    })
    const ram_24GB_LPDDR5 = await prisma.ramConfig.create({
        data: { capacityGb: 24, type: "LPDDR5", eccSupport: false }
    })
    const ram_32GB_DDR5 = await prisma.ramConfig.create({
        data: { capacityGb: 32, type: "DDR5", eccSupport: false }
    })
    const ram_36GB_LPDDR5 = await prisma.ramConfig.create({
        data: { capacityGb: 36, type: "LPDDR5", eccSupport: false }
    })
    const ram_48GB_LPDDR5 = await prisma.ramConfig.create({
        data: { capacityGb: 48, type: "LPDDR5", eccSupport: false }
    })
    const ram_192GB_DDR5_ECC = await prisma.ramConfig.create({
        data: { capacityGb: 192, type: "DDR5 ECC", eccSupport: true }
    })
    const ram_64GB_DDR5_ECC = await prisma.ramConfig.create({
        data: { capacityGb: 64, type: "DDR5 ECC", eccSupport: true }
    })
    const ram_128GB_LPDDR5X = await prisma.ramConfig.create({
        data: { capacityGb: 128, type: "LPDDR5X", eccSupport: false }
    })
    const ram_16GB_DDR5 = await prisma.ramConfig.create({
        data: { capacityGb: 16, type: "DDR5", eccSupport: false }
    })
    const ram_32GB_LPDDR5 = await prisma.ramConfig.create({
        data: { capacityGb: 32, type: "LPDDR5", eccSupport: false }
    })
    const ram_24GB_DDR5_ECC = await prisma.ramConfig.create({
        data: { capacityGb: 24, type: "DDR5 ECC", eccSupport: true }
    })
    const ram_16GB_DDR5_ECC = await prisma.ramConfig.create({
        data: { capacityGb: 16, type: "DDR5 ECC", eccSupport: true }
    })

    console.log("RamConfigs seeded")

    //storage-configs

    const storage_256GB_SSD = await prisma.storageConfig.create({
        data: { capacityGb: 256, type: "NVMe SSD" }
    })
    const storage_512GB_SSD = await prisma.storageConfig.create({
        data: { capacityGb: 512, type: "NVMe SSD" }
    })
    const storage_1000GB_SSD = await prisma.storageConfig.create({
        data: { capacityGb: 1000, type: "NVMe SSD" }
    })
    const storage_2000GB_SSD = await prisma.storageConfig.create({
        data: { capacityGb: 2000, type: "NVMe SSD" }
    })
    const storage_4000GB_SSD = await prisma.storageConfig.create({
        data: { capacityGb: 4000, type: "NVMe SSD" }
    })

    console.log("StorageConfigs seeded")

    //systems
    const system_Mac_Mini_M4 = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "Mac Mini M4", category: "mini_pc", os: "macOS", priceUsd: 799, releaseYear: 2024, url: "https://www.apple.com/shop/buy-mac/mac-mini", active: true, weightKg: 0.67, lengthMm: 127, widthMm: 127, depthMm: 50, screenResolutionX: null, screenResolutionY: null }
    })
    const system_Mac_Mini_M4_Pro = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "Mac Mini M4 Pro", category: "mini_pc", os: "macOS", priceUsd: 1399, releaseYear: 2024, url: "https://www.apple.com/shop/buy-mac/mac-mini", active: true, weightKg: 0.67, lengthMm: 127, widthMm: 127, depthMm: 50, screenResolutionX: null, screenResolutionY: null }
    })
    const system_MacBook_Air_M4_13 = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "MacBook Air M4 13\"", category: "laptop", os: "macOS", priceUsd: 1099, releaseYear: 2025, url: "https://www.apple.com/shop/buy-mac/macbook-air/13-inch", active: true, weightKg: 1.24, lengthMm: 304, widthMm: 215, depthMm: 12, screenResolutionX: 2560, screenResolutionY: 1664 }
    })
    const system_MacBook_Air_M4_15 = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "MacBook Air M4 15\"", category: "laptop", os: "macOS", priceUsd: 1299, releaseYear: 2025, url: "https://www.apple.com/shop/buy-mac/macbook-air/15-inch", active: true, weightKg: 1.51, lengthMm: 340, widthMm: 237, depthMm: 12, screenResolutionX: 2880, screenResolutionY: 1864 }
    })
    const system_MacBook_Pro_M4_Pro_14 = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "MacBook Pro M4 Pro 14\"", category: "laptop", os: "macOS", priceUsd: 1999, releaseYear: 2024, url: "https://www.apple.com/shop/buy-mac/macbook-pro/14-inch", active: true, weightKg: 1.61, lengthMm: 312, widthMm: 221, depthMm: 16, screenResolutionX: 3024, screenResolutionY: 1964 }
    })
    const system_MacBook_Pro_M4_Max_16 = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "MacBook Pro M4 Max 16\"", category: "laptop", os: "macOS", priceUsd: 3499, releaseYear: 2024, url: "https://www.apple.com/shop/buy-mac/macbook-pro/16-inch", active: true, weightKg: 2.14, lengthMm: 356, widthMm: 248, depthMm: 17, screenResolutionX: 3456, screenResolutionY: 2234 }
    })
    const system_Mac_Studio_M4_Max = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "Mac Studio M4 Max", category: "desktop", os: "macOS", priceUsd: 1999, releaseYear: 2025, url: "https://www.apple.com/shop/buy-mac/mac-studio", active: true, weightKg: 2.7, lengthMm: 197, widthMm: 197, depthMm: 94, screenResolutionX: null, screenResolutionY: null }
    })
    const system_iMac_M4 = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "iMac M4", category: "desktop", os: "macOS", priceUsd: 1299, releaseYear: 2024, url: "https://www.apple.com/shop/buy-mac/imac", active: true, weightKg: 4.46, lengthMm: 547, widthMm: 461, depthMm: 147, screenResolutionX: 4480, screenResolutionY: 2520 }
    })
    const system_Mac_Pro_M2_Ultra = await prisma.system.create({
        data: { manufacturerId: apple.id, name: "Mac Pro M2 Ultra", category: "workstation", os: "macOS", priceUsd: 6999, releaseYear: 2023, url: "https://www.apple.com/shop/buy-mac/mac-pro", active: false, weightKg: 18.14, lengthMm: 531, widthMm: 281, depthMm: 218, screenResolutionX: null, screenResolutionY: null }
    })
    const system_DGX_Spark = await prisma.system.create({
        data: { manufacturerId: nvidia.id, name: "NVIDIA DGX Spark", category: "mini_pc", os: "Linux", priceUsd: 3999, releaseYear: 2025, url: "https://www.nvidia.com/en-us/products/workstations/dgx-spark/", active: true, weightKg: 1.2, lengthMm: 150, widthMm: 150, depthMm: 51, screenResolutionX: null, screenResolutionY: null }
    })
    const system_Legion_Tower_5i_Gen9 = await prisma.system.create({
        data: { manufacturerId: lenovo.id, name: "Lenovo Legion Tower 5i Gen 9", category: "desktop", os: "Windows 11 Home", priceUsd: 1099, releaseYear: 2024, url: "https://www.lenovo.com/us/en/c/gaming-pcs/legion", active: true, weightKg: 11, lengthMm: 193, widthMm: 432, depthMm: 432, screenResolutionX: null, screenResolutionY: null }
    })
    const system_XPS_Desktop = await prisma.system.create({
        data: { manufacturerId: dell.id, name: "Dell XPS Desktop", category: "desktop", os: "Windows 11 Home", priceUsd: 899, releaseYear: 2024, url: "https://www.dell.com/en-us/shop/desktop-computers/xps-desktop/spd/xps-8960-desktop", active: false, weightKg: 9.3, lengthMm: 170, widthMm: 394, depthMm: 385, screenResolutionX: null, screenResolutionY: null }
    })
    const system_Z4_G5 = await prisma.system.create({
        data: { manufacturerId: hp.id, name: "HP Z4 G5", category: "workstation", os: "Windows 11 Pro", priceUsd: 2280, releaseYear: 2023, url: "https://www.hp.com/us-en/workstations/z4.html", active: true, weightKg: 12.25, lengthMm: 172, widthMm: 457, depthMm: 386, screenResolutionX: null, screenResolutionY: null }
    })
    const system_ThinkStation_P3_Ultra_SFF_Gen2 = await prisma.system.create({
        data: { manufacturerId: lenovo.id, name: "Lenovo ThinkStation P3 Ultra SFF Gen 2", category: "workstation", os: "Windows 11 Pro", priceUsd: 1749, releaseYear: 2025, url: "https://www.lenovo.com/us/en/p/workstations/thinkstation-p-series/lenovo-thinkstation-p3-ultra-sff-gen-2-intel/len102s0022", active: true, weightKg: 3.6, lengthMm: 87, widthMm: 223, depthMm: 202, screenResolutionX: null, screenResolutionY: null }
    })
    const system_Minisforum_UM890_Pro = await prisma.system.create({
        data: { manufacturerId: minisforum.id, name: "Minisforum UM890 Pro", category: "mini_pc", os: "Windows 11 Pro", priceUsd: 649, releaseYear: 2024, url: "https://store.minisforum.com/products/minisforum-um890pro-mini-pc", active: true, weightKg: null, lengthMm: null, widthMm: null, depthMm: null, screenResolutionX: null, screenResolutionY: null }
    })
    const system_XPS_15 = await prisma.system.create({
        data: { manufacturerId: dell.id, name: "Dell XPS 15", category: "laptop", os: "Windows 11 Home", priceUsd: 1499, releaseYear: 2023, url: "https://www.dell.com/en-us/shop/dell-laptops/xps-15-laptop/spd/xps-15-9530-laptop", active: true, weightKg: 1.86, lengthMm: 344, widthMm: 230, depthMm: 18, screenResolutionX: 1920, screenResolutionY: 1200 }
    })
    const system_ThinkPad_X1_Carbon_Gen11 = await prisma.system.create({
        data: { manufacturerId: lenovo.id, name: "Lenovo ThinkPad X1 Carbon Gen 11", category: "laptop", os: "Windows 11 Pro", priceUsd: 1435, releaseYear: 2023, url: "https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadx1/thinkpad-x1-carbon-gen-11-14-inch-intel/len101t0049", active: true, weightKg: 1.12, lengthMm: 316, widthMm: 222, depthMm: 15, screenResolutionX: 1920, screenResolutionY: 1200 }
    })

    console.log("Systems seeded")

    //system-cpus
    await prisma.systemCpu.create({
        data: { systemId: system_Mac_Mini_M4.id, cpuId: apple_M4_10_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_Mac_Mini_M4_Pro.id, cpuId: apple_M4_Pro_12_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_MacBook_Air_M4_13.id, cpuId: apple_M4_10_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_MacBook_Air_M4_15.id, cpuId: apple_M4_10_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_MacBook_Pro_M4_Pro_14.id, cpuId: apple_M4_Pro_14_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_MacBook_Pro_M4_Max_16.id, cpuId: apple_M4_Max_16_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_Mac_Studio_M4_Max.id, cpuId: apple_M4_Max_14_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_iMac_M4.id, cpuId: apple_M4_10_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_Mac_Pro_M2_Ultra.id, cpuId: apple_M2_Ultra_24_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_DGX_Spark.id, cpuId: nvidia_GB10_Grace_20_Core.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_Legion_Tower_5i_Gen9.id, cpuId: intel_i7_14700F.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_XPS_Desktop.id, cpuId: intel_i7_14700.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_Z4_G5.id, cpuId: intel_Xeon_w5_2445.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_ThinkStation_P3_Ultra_SFF_Gen2.id, cpuId: intel_Ultra7_265.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_Minisforum_UM890_Pro.id, cpuId: amd_Ryzen9_8945HS.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_XPS_15.id, cpuId: intel_i7_13700H.id }
    })
    await prisma.systemCpu.create({
        data: { systemId: system_ThinkPad_X1_Carbon_Gen11.id, cpuId: intel_i7_1365U.id }
    })

    console.log("System CPUs seeded")

    // system-gpus
    await prisma.systemGpu.create({
        data: { systemId: system_Mac_Mini_M4.id, gpuId: apple_M4_10_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_Mac_Mini_M4_Pro.id, gpuId: apple_M4_Pro_16_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_MacBook_Air_M4_13.id, gpuId: apple_M4_10_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_MacBook_Air_M4_15.id, gpuId: apple_M4_10_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_MacBook_Pro_M4_Pro_14.id, gpuId: apple_M4_Pro_20_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_MacBook_Pro_M4_Max_16.id, gpuId: apple_M4_Max_40_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_Mac_Studio_M4_Max.id, gpuId: apple_M4_Max_32_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_iMac_M4.id, gpuId: apple_M4_10_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_Mac_Pro_M2_Ultra.id, gpuId: apple_M2_Ultra_60_Core_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_DGX_Spark.id, gpuId: nvidia_Blackwell_GB10_gpu.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_Legion_Tower_5i_Gen9.id, gpuId: nvidia_GeForce_RTX_4070_Super.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_XPS_Desktop.id, gpuId: nvidia_GeForce_RTX_3050.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_Z4_G5.id, gpuId: nvidia_GeForce_RTX_4000_sff_Ada.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_ThinkStation_P3_Ultra_SFF_Gen2.id, gpuId: nvidia_GeForce_RTX_4000_sff_Ada.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_Minisforum_UM890_Pro.id, gpuId: amd_Radeon_780M.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_XPS_15.id, gpuId: nvidia_GeForce_RTX_3050.id }
    })
    await prisma.systemGpu.create({
        data: { systemId: system_ThinkPad_X1_Carbon_Gen11.id, gpuId: intel_Iris_Xe_i7_1365U.id }
    })

    console.log("System GPUs seeded")

    // system-ram
    await prisma.systemRam.create({
        data: { systemId: system_Mac_Mini_M4.id, ramConfigId: ram_16GB_LPDDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_Mac_Mini_M4_Pro.id, ramConfigId: ram_24GB_LPDDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_MacBook_Air_M4_13.id, ramConfigId: ram_16GB_LPDDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_MacBook_Air_M4_15.id, ramConfigId: ram_16GB_LPDDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_MacBook_Pro_M4_Pro_14.id, ramConfigId: ram_24GB_LPDDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_MacBook_Pro_M4_Max_16.id, ramConfigId: ram_36GB_LPDDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_Mac_Studio_M4_Max.id, ramConfigId: ram_36GB_LPDDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_iMac_M4.id, ramConfigId: ram_16GB_LPDDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_Mac_Pro_M2_Ultra.id, ramConfigId: ram_192GB_DDR5_ECC.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_DGX_Spark.id, ramConfigId: ram_128GB_LPDDR5X.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_Legion_Tower_5i_Gen9.id, ramConfigId: ram_32GB_DDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_XPS_Desktop.id, ramConfigId: ram_16GB_DDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_Z4_G5.id, ramConfigId: ram_16GB_DDR5_ECC.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_ThinkStation_P3_Ultra_SFF_Gen2.id, ramConfigId: ram_32GB_DDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_Minisforum_UM890_Pro.id, ramConfigId: ram_32GB_DDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_XPS_15.id, ramConfigId: ram_16GB_DDR5.id }
    })
    await prisma.systemRam.create({
        data: { systemId: system_ThinkPad_X1_Carbon_Gen11.id, ramConfigId: ram_16GB_LPDDR5.id }
    })

    console.log("System RamConfigs seeded")
    //system-storage
    await prisma.systemStorage.create({
        data: { systemId: system_Mac_Mini_M4.id, storageConfigId: storage_256GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_Mac_Mini_M4_Pro.id, storageConfigId: storage_512GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_MacBook_Air_M4_13.id, storageConfigId: storage_256GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_MacBook_Air_M4_15.id, storageConfigId: storage_256GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_MacBook_Pro_M4_Pro_14.id, storageConfigId: storage_512GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_MacBook_Pro_M4_Max_16.id, storageConfigId: storage_1000GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_Mac_Studio_M4_Max.id, storageConfigId: storage_512GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_iMac_M4.id, storageConfigId: storage_256GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_Mac_Pro_M2_Ultra.id, storageConfigId: storage_1000GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_DGX_Spark.id, storageConfigId: storage_4000GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_Legion_Tower_5i_Gen9.id, storageConfigId: storage_1000GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_XPS_Desktop.id, storageConfigId: storage_1000GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_Z4_G5.id, storageConfigId: storage_512GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_ThinkStation_P3_Ultra_SFF_Gen2.id, storageConfigId: storage_512GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_Minisforum_UM890_Pro.id, storageConfigId: storage_512GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_XPS_15.id, storageConfigId: storage_512GB_SSD.id }
    })
    await prisma.systemStorage.create({
        data: { systemId: system_ThinkPad_X1_Carbon_Gen11.id, storageConfigId: storage_512GB_SSD.id }
    })

    console.log("System StorageConfigs seeded")
}
main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })