import { notFound } from "next/navigation";
import Link from "next/link"
import { System } from "@/lib/types";
import ImageCarousel from "../ImageCarousel";

async function SystemDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/systems/${id}`, { cache: 'no-store' })
    if (!response.ok) {
        notFound()
    }
    const system: System = await response.json()
    return (
        <div>
            <h2>{system.name}</h2>
            <div>
                <ImageCarousel images={[]} systemName={system.name} />
                <div>
                    <div>
                        <p>{system.priceUsd}</p>
                        {system.url && <a href={system.url} target="_blank" rel="noopener noreferrer">Buy</a>}
                    </div>

                    <div>
                        <details>
                            <summary>CPU</summary>
                            {system.systemCpus.map((systemCpu) => (
                                <div key={systemCpu.id}>
                                    <p>{systemCpu.cpu.name}</p>
                                    <p>Base Clock GHz: {systemCpu.cpu.baseClockGhz}</p>
                                    {systemCpu.cpu.boostClockGhz && <p>Boost Clock GHz: {systemCpu.cpu.boostClockGhz}</p>}
                                    {systemCpu.cpu.passmarkScore && <p>Passmark Score: {systemCpu.cpu.passmarkScore}</p>}
                                    {systemCpu.cpu.tdpWatts && <p>TDP Watts: {systemCpu.cpu.tdpWatts}</p>}
                                    <p>ECC: {systemCpu.cpu.eccSupport ? "Yes" : "No"}</p>
                                    <p>Integrated Graphics: {systemCpu.cpu.integratedGraphics ? "Yes" : "No"}</p>
                                </div>
                            ))}
                        </details>
                        <details>
                            <summary>GPU</summary>
                            {system.systemGpus.map((systemGpu) => (
                                <div key={systemGpu.id}>
                                    <p>{systemGpu.gpu.name}</p>
                                    <p>VRAM: {systemGpu.gpu.vramGb} GB</p>
                                    <p>Integrated: {systemGpu.gpu.isIntegrated ? "Yes" : "No"}</p>
                                    {systemGpu.gpu.passmarkScore && <p>Passmark Score: {systemGpu.gpu.passmarkScore}</p>}
                                    {systemGpu.gpu.tdpWatts && <p>TDP Watts: {systemGpu.gpu.tdpWatts}</p>}
                                </div>
                            ))}
                        </details>
                        <details>
                            <summary>RAM</summary>
                            {system.systemRam.map((systemRam) => (
                                <div key={systemRam.id}>
                                    <p>Capacity: {systemRam.ramConfig.capacityGb} GB</p>
                                    <p>Type: {systemRam.ramConfig.type}</p>
                                    <p>ECC: {systemRam.ramConfig.eccSupport ? "Yes" : "No"}</p>
                                </div>
                            ))}
                        </details>
                        <details>
                            <summary>Storage</summary>
                            {system.systemStorage.map((systemStorage) => (
                                <div key={systemStorage.id}>
                                    <p>Capacity: {systemStorage.storageConfig.capacityGb} GB</p>
                                    <p>Type: {systemStorage.storageConfig.type}</p>
                                </div>
                            ))}
                        </details>
                    </div>
                    <Link href="/results">← Back to results</Link>
                </div>
            </div>
        </div>
    )
}
export default SystemDetailPage