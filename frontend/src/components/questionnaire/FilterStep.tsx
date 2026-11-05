"use client"
import { apiUrl } from "@/lib/api"
import { useState, useEffect, ChangeEvent } from "react";
import { SystemCategory, System, FilterProfile, OsType } from "@/lib/types";
import Link from "next/link"

type CpuOption = {
    id: number,
    passmarkScore: number,
    name: string
}

type SortOption = "priceAsc" | "priceDesc" | "yearDesc" | "nameAsc" | "nameDesc"

const SORT_LABELS:Record <SortOption, string> = {
    "priceAsc": "Price (Ascending)",
    "priceDesc": "Price (Descending)",
    "yearDesc": "Year (Descending)",
    "nameAsc": "Name (Ascending)",
    "nameDesc": "Name (Descending)"
}
const SORT_OPTIONS: SortOption[] = [
    "priceDesc",
    "priceAsc",
    "yearDesc",
    "nameAsc",
    "nameDesc"
]
const CATEGORY_LABELS:Record <SystemCategory, string> = {
    "desktop": "Desktop",
    "laptop": "Laptop",
    "mini_pc": "Mini PC",
    "workstation": "Workstation"
}
const OS_LABELS:Record <OsType, string> = {
    "linux": "Linux",
    "macos": "macOS",
    "windows": "Windows"
}

const CATEGORY_OPTIONS: SystemCategory[] = ["desktop", "laptop", "mini_pc", "workstation"]

const OS_OPTIONS: OsType[] = ["windows", "macos", "linux"]

const DEBOUNCE_MS = 300
function FilterStep() {
    const [filterProfile, setFilterProfile] = useState<FilterProfile>({
        category: null,
        osPreference: null,
        minRamGb: null,
        minVramGb: null,
        minCpuScore: null,
        minStorageGb: null,
        eccRequired: false,
        maxPriceUsd: null
    })
    
    const [cpuOptions, setCpuOptions] = useState<CpuOption[]>([])
    const [cpuLoadError, setCpuLoadError] = useState<boolean>(false)
    const [cpuLoading, setCpuLoading] = useState<boolean>(true)
    const [selectedCpuId, setSelectedCpuId] = useState<number | null>(null)
    const [sortOption, setSortOption] = useState<SortOption>("priceAsc")
    useEffect(() => {
        async function getCpuOptions() {
            try {
                const response = await fetch(apiUrl("/cpus/options"))
                if (!response.ok) {
                    throw new Error(`Failed to fetch CPU options: ${response.status}`)
                }
                const parsedResponse = await response.json()
                setCpuOptions(parsedResponse)
            } catch (err) {
                setCpuLoadError(true)
            } finally {
                setCpuLoading(false)
            }
        }
        getCpuOptions()
    }, [])
    function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
        const rawCategoryValue = event.target.value
        if(rawCategoryValue === "") {
            setFilterProfile(previousProfile => ({ ...previousProfile, category: null}))
        } else {
            const categoryValue = rawCategoryValue as SystemCategory
            setFilterProfile(previousProfile => ({ ...previousProfile, category: categoryValue}))
        }
        
    }
    function handleCpuChange(event: ChangeEvent<HTMLSelectElement>) {
        const rawCpuValue = event.target.value
        if (rawCpuValue === "") {
            setSelectedCpuId(null)
            setFilterProfile(previousProfile => ({ ...previousProfile, minCpuScore: null }))
        } else {
            const cpuValue = Number(rawCpuValue)
            const selectedCpu = cpuOptions.find((option) => (
                option.id === cpuValue
            ))
            setSelectedCpuId(cpuValue)
            setFilterProfile(previousProfile => ({ ...previousProfile, minCpuScore: selectedCpu?.passmarkScore ?? null }))
        }
    }
    function handleVramChange(event: ChangeEvent<HTMLInputElement>) {
        const rawVramValue = event.target.value
        if (rawVramValue === "") {
            setFilterProfile(previousProfile => ({ ...previousProfile, minVramGb: null}))
        } else {
            const vramValue = Number(rawVramValue)
            setFilterProfile(previousProfile => ({ ...previousProfile, minVramGb: vramValue}))
        }
    }
    function handleStorageChange(event: ChangeEvent<HTMLInputElement>) {
        const rawStorageValue = event.target.value
        if (rawStorageValue === "") {
            setFilterProfile(previousProfile => ({ ...previousProfile, minStorageGb: null}))
        } else {
            const storageValue = Number(rawStorageValue)
            setFilterProfile(previousProfile => ({ ...previousProfile, minStorageGb: storageValue}))
        }
    }
    function handleRamChange(event: ChangeEvent<HTMLInputElement>){
        const rawRamValue = event.target.value
        if (rawRamValue === "") {
            setFilterProfile(previousProfile => ({ ...previousProfile, minRamGb: null}))
        } else {
            const ramValue = Number(rawRamValue)
            setFilterProfile(previousProfile => ({ ...previousProfile, minRamGb: ramValue}))
        }
    }
    function handleOsChange(event: ChangeEvent<HTMLSelectElement>){
        const rawOsValue = event.target.value
        if(rawOsValue === "") {
            setFilterProfile(previousProfile => ({ ...previousProfile, osPreference: null}))
        } else {
            const osValue = rawOsValue as OsType
            setFilterProfile(previousProfile => ({ ...previousProfile, osPreference: osValue}))
        }
    }
    function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>){
        const rawMaxPriceValue = event.target.value
        if (rawMaxPriceValue === "") {
            setFilterProfile(previousProfile => ({ ...previousProfile, maxPriceUsd: null}))
        } else {
            const maxPriceValue = Number(rawMaxPriceValue)
            setFilterProfile(previousProfile => ({ ...previousProfile, maxPriceUsd: maxPriceValue}))
        }
    }
    function handleEccChange(event: ChangeEvent<HTMLInputElement>) {
        const eccValue: boolean = event.target.checked
        setFilterProfile(previousProfile => ({ ...previousProfile, eccRequired: eccValue}))
    }
    
    const [results, setResults] = useState<System[]>([])
    const [resultsLoading, setResultsLoading] = useState<boolean>(true)
    const [resultsError, setResultsError] = useState<boolean>(false)
    useEffect(() => {
        const controller = new AbortController()
        const timer = setTimeout(getResults, DEBOUNCE_MS)
        setResultsLoading(true)
        async function getResults() {
            try {
                setResultsError(false)
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(filterProfile),
                    signal: controller.signal
                }
                const response = await fetch(apiUrl("/systems/filter"), options)
                if (!response.ok) {
                    throw new Error(`Failed to fetch results: ${response.status}`)
                }
                const data: System[] = await response.json()
                setResults(data)
                setResultsLoading(false)
            } catch (err) {
                if(err instanceof DOMException && err.name === "AbortError") {
                    return
                } 
                setResultsError(true)
                setResultsLoading(false)
            }
        } 
        return (() => {
            controller.abort()
            clearTimeout(timer)
        })
    }, [filterProfile])

    function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
        const sortValue = event.target.value as SortOption
        setSortOption(sortValue)
    }

    let statusText = ""
    if (resultsError === true) {
        statusText = "An error occurred. Adjust your specs and try again."
    } else if (resultsLoading === true) {
        statusText = "Loading results..."
    }  else if (results.length === 0) {
        statusText = "No results found. Adjust your specs and try again."
    } else if (results.length === 1){
        statusText = "1 result found."
    } else {
        statusText = `${results.length} results found.`
    }

    const sortedResults = [...results].sort((a: System, b: System) => {
        switch (sortOption) {
            case "priceAsc":
                return a.priceUsd - b.priceUsd
            case "priceDesc":
                return b.priceUsd - a.priceUsd
            case "yearDesc":
                if (b.releaseYear === null && a.releaseYear === null) {
                    return 0
                } else if (a.releaseYear === null) {
                    return 1
                } else if (b.releaseYear === null) {
                    return -1
                } else {
                    return b.releaseYear - a.releaseYear
                }
            case "nameAsc": 
                return a.name.localeCompare(b.name)
            case "nameDesc":
                return b.name.localeCompare(a.name)
            default: {
                const _exhaustiveCheck: never = sortOption
                return _exhaustiveCheck
            }
    }})
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-6 bg-panel border border-hairline rounded-md p-6 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-gutter: stable min-w-0 w-full">
                <div className="flex flex-col gap-1">
                <label className="font-body text-text-muted">Category</label>
                <select id="categoryOption" value={filterProfile.category ?? ""} onChange={handleCategoryChange} className="bg-panel border border-hairline font-body text-text-primary focus:border-accent-teal px-3 py-2">
                    <option value="">Any</option>
                    {CATEGORY_OPTIONS.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {CATEGORY_LABELS[option]}
                    </option>
                ))}</select>
                </div>
                <div className="flex flex-col gap-1">
                <label className="font-body text-text-muted">CPU Performance</label>
                    <p className="font-body text-xs text-text-muted">What CPU should the system's CPU have equivalent performance to?</p>
                <select id="cpuOption" value={selectedCpuId ?? ""} onChange={handleCpuChange} disabled={cpuLoading} className="bg-panel border border-hairline font-body text-text-primary focus:border-accent-teal disabled:opacity-40 disabled:pointer-events-none px-3 py-2">
                    <option value="">{cpuLoading ? "Loading CPUs..." : "Any"}</option>
                    {cpuOptions.map((option) => (
                    <option
                        key={option.id}
                        value={option.id}
                    >
                        {option.name}
                    </option>
                ))}</select>
                {cpuLoadError && <p className="font-body text-text-muted">Failed to load CPU list</p>}
                </div>
                <div className="flex flex-col gap-1">
                <label className="font-body text-text-muted">Min VRAM (GB)</label>
                <input type="number" min={0} id="vramOption" value={filterProfile.minVramGb ?? ""} placeholder="Any" onChange={handleVramChange} className="bg-panel border border-hairline font-body text-text-primary px-3 py-2 focus:border-accent-teal" />
                </div>
                <div className="flex flex-col gap-1">
                <label className="font-body text-text-muted">Min RAM (GB)</label>
                <input type="number" min={0} id="ramOption" value={filterProfile.minRamGb ?? ""} placeholder="Any" onChange={handleRamChange} className="bg-panel border border-hairline font-body text-text-primary px-3 py-2 focus:border-accent-teal" />
                </div>
                <div className="flex flex-col gap-1">
                <label className="font-body text-text-muted">Min Storage (GB)</label>
                <input type="number" min={0} id="storageOption" value={filterProfile.minStorageGb ?? ""} placeholder="Any" onChange={handleStorageChange} className="bg-panel border border-hairline font-body text-text-primary px-3 py-2 focus:border-accent-teal" />
                </div>
                <div className="flex flex-col gap-1">
                <label className="font-body text-text-muted">OS</label>
                <select id="osOption" value={filterProfile.osPreference ?? ""} onChange={handleOsChange} className="bg-panel border border-hairline font-body text-text-primary focus:border-accent-teal px-3 py-2">
                    <option value="">Any</option>
                    {OS_OPTIONS.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {OS_LABELS[option]}
                    </option>
                ))}</select>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                <label className="font-body text-text-muted">Max Price (USD)</label>
                <input type="number" min={0} id="maxPriceOption" value={filterProfile.maxPriceUsd ?? ""} placeholder="Any" onChange={handleMaxPriceChange} className="bg-panel border border-hairline font-body text-text-primary px-3 py-2 focus:border-accent-teal" />
                </div>
                <div className="flex items-center gap-2">
                <label className="font-body text-text-muted">ECC</label>
                <input type="checkbox" id="eccOption" checked={filterProfile.eccRequired} onChange={handleEccChange} className="px-3 py-2 accent-accent-copper" />
                </div>
            </div>
            <div className="bg-panel border border-hairline rounded-md h-[calc(100vh-6rem)] overflow-y-auto scrollbar-gutter: stable min-w-0 w-full">
                <div className="flex items-start pt-6 border-b border-hairline justify-between sticky top-0 bg-panel rounded-t-md px-6 pb-4 z-10">
                    <div className="flex flex-col">
                        <h2 className="font-heading text-text-primary">Results</h2>
                        <p className="font-body text-text-muted text-sm">{statusText}</p>
                    </div>
                    <div>
                    {results.length > 0 && <select value={sortOption} onChange={handleSortChange} className="bg-panel border border-hairline font-body text-text-primary focus:border-accent-teal px-3 py-2">{SORT_OPTIONS.map((option) => (
                        <option key={option} value={option}>{SORT_LABELS[option]}</option>
                    ))}</select>}
                    </div>
                </div>
                
                <div className="divide-y divide-hairline pb-6">
                {sortedResults.map((result) => (
                    <Link key={result.id} href={"/systems/" + result.id} className="flex items-center gap-4 py-4 px-6 rounded-md hover:ring-2 hover:ring-inset hover:ring-accent-teal transition-shadow">
                        {result.systemImages.length > 0
                                ? <img src={result.systemImages[0].url} alt={result.systemImages[0].altText || result.name} className="w-16 h-16 shrink-0 border border-hairline object-contain bg-panel" />
                                : <div className="w-16 h-16 shrink-0 bg-panel border border-hairline" />
                            }
                        <div className="flex flex-col flex-1 gap-1 min-w-0">
                            <div className="flex justify-between items-baseline gap-2">
                                <h3 className="font-heading text-text-primary">{result.name}</h3>
                                <span className="font-mono text-accent-copper">${result.priceUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex">
                                <p className="font-mono text-text-muted text-sm">
                                    {result.systemCpus[0]?.cpu.name} · {result.systemGpus[0]?.gpu.name} · {result.systemRam[0]?.ramConfig.capacityGb}GB {result.systemRam[0]?.ramConfig.type}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            </div>
        </div>
    )
}
export default FilterStep