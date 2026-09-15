"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { System } from "@/lib/types"
import Link from "next/link"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export default function ResultsPage() {
    const router = useRouter()

    const [results, setResults] = useState<System[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchResults() {
            try {
                const rawReqProfile = sessionStorage.getItem("requirementsProfile")
                if (rawReqProfile === null) {
                    router.push("/questionnaire")
                    return
                }
                const requirementsProfile = JSON.parse(rawReqProfile)
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requirementsProfile)
                }
                const recommend = await fetch(API_BASE_URL + "/systems/recommend", options)
                const parsedRecommend = await recommend.json()
                setResults(parsedRecommend)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("Something went wrong")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchResults()

    }, [])
    if (loading) {
        return (
            <div className="max-w-5x1 mx-auto px-6 py-10">
                <p className="font-body text-text-muted">Loading results...</p>
            </div>
        )
    } else if (error) {
        return (
            <div className="max-w-5x1 mx-auto px-6 py-10">
                <p className="font-body text-text-primary">Something went wrong: {error}</p>
                <div className="flex justify-center mt-8">
                    <Link href="/questionnaire" className="border border-accent-teal text-accent-teal font-heading px-4 py-2 hover:bg-accent-teal hover:text-bg transition-colors">
                        Back to Questionnaire
                    </Link>
                </div>
            </div>
        )
    } else if (results?.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">
                <p className="font-body text-text-primary">No results. Try adjusting your requirements and searching again.</p>
                <div className="flex justify-center mt-8">
                    <Link href="/questionnaire" className="border border-accent-teal text-accent-teal font-heading px-4 py-2 hover:bg-accent-teal hover:text-bg transition-colors">
                        Back to Questionnaire
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="max-w-3x1 mx-auto px-6 py-10">
                <h1 className="font-heading text 3x1 text-text-primary mb-6">Results</h1>
                <div className="divide-y divide-hairline">
                    {results?.map((result, index) => (
                        <Link key={result.id} href={`/systems/${result.id}`} className="flex items-center gap-4 py-4">
                            <span className="w-6 shrink-0 font-mono text-text-muted text-sm text-right">
                                {index + 1}
                            </span>
                            <div className="w-16 h-16 shrink-0 bg-panel border border-hairline" />
                            <div className="flex flex-col flex-1 gap-1">
                                {index === 0 && (
                                    <span className="font-mono text-accent-teal text-xs">Best Match</span>
                                )}
                                <div className="flex justify-between items-baseline">
                                    <h2 className="font-heading text-text-primary">{result.name}</h2>
                                    <span className="font-mono text-accent-copper">${result.priceUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <p className="font-mono text-text-muted text-sm">
                                    {result.systemCpus[0]?.cpu.name} · {result.systemGpus[0]?.gpu.name} · {result.systemRam[0]?.ramConfig.capacityGb}GB {result.systemRam[0]?.ramConfig.type}
                                </p>
                            </div>
                        </Link>
                    ))}
                    <Link href="/questionnaire" className="mt-8 inline-block border border-accent-teal text-accent-teal font-heading px-4 py-2 hover:bg-accent-teal hover:text-bg transition-colors">
                        Back to Questionnaire
                    </Link>
                </div>
            </div>
        )
    }
}