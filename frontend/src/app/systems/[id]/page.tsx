import { notFound } from "next/navigation";
import Link from "next/link"
import { System } from "@/lib/types";
import ImageCarousel from "../ImageCarousel";

async function SystemDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/systems/${id}`, { cache: 'no-store' })
    if (!response.ok) {
        throw new Error(`Failed to fetch systems: ${response.status}`)
    }
    const system: System = await response.json()
    if (!system) {
        notFound()
    }
    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="font-heading text-3xl text-text-primary mb-8">{system.name}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <ImageCarousel images={[]} systemName={system.name} />
                <div className="flex flex-col gap-6">
                    <div>
                        <p>${system.priceUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        {system.url && <a href={system.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block border border-accent-copper text-accent-copper font-heading px-4 py-2 hover:bg-accent-copper hover:text-bg transition-colors">Buy</a>}
                    </div>

                    <div className="divide-y divide-hairline">
                        <details className="group py-4">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-heading text-text-primary">CPU</span>
                                <span className="transition-transform group-open:rotate-90 text-accent-copper">
                                    ▸
                                </span>
                            </summary>
                            <div className="pt-4">
                                {system.systemCpus.map((systemCpu) => (
                                    <div key={systemCpu.id}>
                                        <p className="font-mono text-text-primary">{systemCpu.cpu.name}</p>
                                        <p>
                                            <span className="text-text-muted">Base Clock GHz: </span>
                                            <span className="font-mono text-text-primary">{systemCpu.cpu.baseClockGhz}</span>
                                        </p>
                                        {systemCpu.cpu.boostClockGhz && (
                                            <p>
                                                <span className="text-text-muted">Boost Clock GHz: </span>
                                                <span className="font-mono text-text-primary">{systemCpu.cpu.boostClockGhz}</span>
                                            </p>
                                        )}
                                        {systemCpu.cpu.passmarkScore && (
                                            <p>
                                                <span className="text-text-muted">Passmark Score: </span>
                                                <span className="font-mono text-text-primary">{systemCpu.cpu.passmarkScore}</span>
                                            </p>)}
                                        {systemCpu.cpu.tdpWatts && (
                                            <p>
                                                <span className="text-text-muted">TDP Watts: </span>
                                                <span className="font-mono text-text-primary">{systemCpu.cpu.tdpWatts}</span>
                                            </p>
                                        )}
                                        <p>
                                            <span className="text-text-muted">ECC: </span>
                                            <span className="font-mono text-text-primary">{systemCpu.cpu.eccSupport ? "Yes" : "No"}</span>
                                        </p>
                                        <p>
                                            <span className="text-text-muted">Integrated Graphics: </span>
                                            <span className="font-mono text-text-primary">{systemCpu.cpu.integratedGraphics ? "Yes" : "No"}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </details>
                        <details className="group py-4">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-heading text-text-primary">GPU</span>
                                <span className="transition-transform group-open:rotate-90 text-accent-copper">
                                    ▸
                                </span>
                            </summary>
                            <div className="pt-4">
                                {system.systemGpus.length === 0 ? (
                                    <p className="text-text-muted">No dedicated GPU</p>
                                ) : (
                                    system.systemGpus.map((systemGpu) => (
                                        <div key={systemGpu.id}>
                                            <p className="font-mono text-text-primary">{systemGpu.gpu.name}</p>
                                            <p>
                                                <span className="text-text-muted">VRAM: </span>
                                                <span className="font-mono text-text-primary">{systemGpu.gpu.vramGb} GB</span>
                                            </p>
                                            <p>
                                                <span className="text-text-muted">Integrated: </span>
                                                <span className="font-mono text-text-primary">{systemGpu.gpu.isIntegrated ? "Yes" : "No"}</span>
                                            </p>
                                            {systemGpu.gpu.passmarkScore && (
                                                <p>
                                                    <span className="text-text-muted">Passmark Score: </span>
                                                    <span className="font-mono text-text-primary">{systemGpu.gpu.passmarkScore}</span>
                                                </p>
                                            )}
                                            {systemGpu.gpu.tdpWatts && (
                                                <p>
                                                    <span className="text-text-muted">TDP Watts: </span>
                                                    <span className="font-mono text-text-primary">{systemGpu.gpu.tdpWatts}</span>
                                                </p>
                                            )}
                                        </div>
                                    )))}
                            </div>
                        </details>
                        <details className="group py-4">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-heading text-text-primary">RAM</span>
                                <span className="transition-transform group-open:rotate-90 text-accent-copper">
                                    ▸
                                </span>
                            </summary>
                            <div className="pt-4">
                                {system.systemRam.map((systemRam) => (
                                    <div key={systemRam.id}>
                                        <p>
                                            <span className="text-text-muted">Capacity: </span>
                                            <span className="font-mono text-text-primary">{systemRam.ramConfig.capacityGb} GB</span>
                                        </p>
                                        <p>
                                            <span className="text-text-muted">Type: </span>
                                            <span className="font-mono text-text-primary">{systemRam.ramConfig.type}</span>
                                        </p>
                                        <p>
                                            <span className="text-text-muted">ECC: </span>
                                            <span className="font-mono text-text-primary">{systemRam.ramConfig.eccSupport ? "Yes" : "No"}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </details>
                        <details className="group py-4">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-heading text-text-primary">Storage</span>
                                <span className="transition-transform group-open:rotate-90 text-accent-copper">
                                    ▸
                                </span>
                            </summary>
                            <div className="pt-4">
                                {system.systemStorage.map((systemStorage) => (
                                    <div key={systemStorage.id}>
                                        <p>
                                            <span className="text-text-muted">Capacity: </span>
                                            <span className="font-mono text-text-primary">{systemStorage.storageConfig.capacityGb} GB</span>
                                        </p>
                                        <p>
                                            <span className="text-text-muted">Type: </span>
                                            <span className="font-mono text-text-primary">{systemStorage.storageConfig.type}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </details>
                    </div>
                    <Link href="/results" className="mt-8 inline-block border border-accent-teal text-accent-teal font-heading px-4 py-2 hover:bg-accent-teal hover:text-bg transition-colors">← Back to results</Link>
                </div>
            </div>
        </div>
    )
}
export default SystemDetailPage