import { minifySync } from "next/dist/build/swc/generated-native"
import { Tiles } from "./tiles"
import type { QuestionnaireAnswers, RequirementsProfile } from "./types"
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external"

export function buildRequirementsProfile(answers: QuestionnaireAnswers): RequirementsProfile {
    const selectedTiles = Tiles.filter(tile => answers.selectedTileIds.includes(tile.id))
    let category = answers.category
    const maxPriceUsd = answers.budgetUsd
    const longevityYears = answers.longevityYears
    const osPreference = (answers.osPreference === "none" ? null : answers.osPreference)

    const portabilityImportant = answers.category === "laptop"
    const eccRequired = selectedTiles.some(tile => tile.eccSignal)
    const localAiWorkloads = selectedTiles.some(tile => tile.aiSignal)
    const integratedGraphicsOk = !selectedTiles.some(tile => tile.needsDedicatedGpu)

    let storageTotal = 0
    let minStorageGb = 0
    for(let i = 0; i < selectedTiles.length; i++){
        const currentTile = selectedTiles[i]
        storageTotal += currentTile.storageWeight
    }
    if((storageTotal === 0)){
        minStorageGb = 128
    } else if (storageTotal <= 4){
        minStorageGb = 256
    } else if (storageTotal <= 9){
        minStorageGb = 512
    } else if ((storageTotal >= 10) && (storageTotal <= 15)){
        minStorageGb = 1000
    } else if (storageTotal >= 16){
        minStorageGb = 2000
    }

    let minRamGb = 0
    const ramList = selectedTiles.map(tile => tile.ramWeight)
    ramList.sort((a, b) => b - a)
    const ramScore = ramList[0] * 1 + (ramList[1] ?? 0) * 0.5
    if(ramScore === 0){
        minRamGb = 4
    } else if (ramScore <= 2.5){
        minRamGb = 8
    } else if (ramScore <= 4){
        minRamGb = 16
    } else if (ramScore <= 6){
        minRamGb = 32
    } else if (ramScore > 6){
        minRamGb = 64
    }

    let minCpuScore = 0
    let baseCpuScore = 0
    const highestCpuWeight = Math.max(...selectedTiles.map(tile => tile.cpuWeight))
    if(highestCpuWeight === 5){
        baseCpuScore = 20000
    } else if (highestCpuWeight === 4){
        baseCpuScore = 14000
    } else if (highestCpuWeight === 3){
        baseCpuScore = 8000
    } else if (highestCpuWeight === 2){
        baseCpuScore = 4000
    } else if (highestCpuWeight === 1){
        baseCpuScore = 2000
    }

    let longevityMultiplier = 1
    if(longevityYears !== null){
        if(answers.longevityYears >= 7){
            longevityMultiplier = 1.4
        } else if (answers.longevityYears >= 5){
            longevityMultiplier = 1.2
        } else {
            longevityMultiplier = 1
        }
    }
    let gamingAdjustment = 0
    if(answers.gamingStyle === "competitive"){
        gamingAdjustment = 4000
    } else if (answers.gamingStyle === "demanding"){
        gamingAdjustment = 2000
    } else {
        gamingAdjustment = 0
    }

    minCpuScore = Math.round(baseCpuScore * longevityMultiplier + gamingAdjustment)

    let minVramGb
    let gamingVram
    let aiVram
    if(answers.targetResolution === "4k"){
        gamingVram = 16
    } else if (answers.targetResolution === "1440p"){
        gamingVram = 12
    } else if (answers.targetResolution === "1080p"){
        gamingVram = 8
    } else {
        gamingVram = null
    }

    if(answers.aiModelSize === "large"){
        aiVram = 24
    } else if (answers.aiModelSize === "mid"){
        aiVram = 16
    } else if (answers.aiModelSize === "small"){
        aiVram = 8
    } else {
        aiVram = null
    }
    if((gamingVram === null) && (aiVram === null)){
        minVramGb = null
    } else {
        minVramGb = Math.max(aiVram ?? 0, gamingVram ?? 0)
    }
    if((eccRequired === true) && (category !== "workstation")){
        category = "workstation"
    }

    return { category, osPreference, minRamGb, minVramGb, minCpuScore, minStorageGb, eccRequired, integratedGraphicsOk, maxPriceUsd, portabilityImportant, localAiWorkloads, longevityYears}
} 