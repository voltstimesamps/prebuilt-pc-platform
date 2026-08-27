"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { System } from "@/lib/types"
import { profile } from "console"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export default function ResultsPage(){
    const router = useRouter()

    const [results, setResults] = useState<System[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchResults() {
            try{
                const rawReqProfile = sessionStorage.getItem("requirementsProfile")
                if(rawReqProfile === null){
                    router.push("/questionnaire")
                    return
                }
                    const requirementsProfile = JSON.parse(rawReqProfile)
                    const options = {
                        method: "POST",
                        headers: {"Content-Type": "application/json"}, 
                        body: JSON.stringify(requirementsProfile)
                    }
                    const recommend = await fetch(API_BASE_URL + "/systems/recommend", options)
                    const parsedRecommend = await recommend.json()
                    setResults(parsedRecommend)                                
            } catch (err) {
                if(err instanceof Error){
                    setError(err.message)
                } else {
                    setError("Something went wrong")
                }
            } finally {
                 setLoading(false)
            }}
    fetchResults()
    }, [])
    if(loading){
        return(
            <div>Loading...</div>
        )
    } else if(error){
        return(
            <div>Error: {error}</div>
        )
    } else if(results?.length === 0){
        return(
            <div>No results. Please try again with lower specifications</div>
        )
    } else {
        return(
            <div>
                <h1>Results:</h1>
                <div>
                    {results?.map((result, index) => (
                        <div
                        key={result.id}>
                            {index + 1}. {result.name} - ${result.priceUsd}
                            
                        </div>
                    ))}
                </div>
            </div>
        )
    }    
}