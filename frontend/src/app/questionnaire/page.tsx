"use client"
import { useState } from 'react';
import type { QuestionnaireAnswers, QuestionnaireStep } from "@/lib/types";
import { deriveSteps } from '@/lib/steps';
import { useRouter } from 'next/navigation';
import { buildRequirementsProfile } from '@/lib/aggregation';
import CategoryStep from "@/components/questionnaire/CategoryStep"
import BudgetStep from '@/components/questionnaire/BudgetStep';
import LongevityStep from '@/components/questionnaire/LongevityStep';
import OsStep from '@/components/questionnaire/OsStep';
import TilesStep from '@/components/questionnaire/TilesStep';
import GamingStyleStep from '@/components/questionnaire/GamingStyleStep';
import TargetResolutionStep from '@/components/questionnaire/TargetResolutionStep';
import AiModelSizeStep from '@/components/questionnaire/AiModelSizeStep';

export default function QuestionnairePage () {
    const router = useRouter()
    const [answers, setAnswers] = useState<QuestionnaireAnswers>({category: null, budgetUsd: null, longevityYears: null, osPreference: null, selectedTileIds: []})
    const [step, setStep] = useState<QuestionnaireStep | null>(null)
        
    function handleAnswer(update: Partial<QuestionnaireAnswers>){
        const updatedAnswers = { ...answers, ...update}
        setAnswers(updatedAnswers)
        const steps = deriveSteps(updatedAnswers)
        const nextStepIndex = steps.indexOf(step) + 1
        if(steps[nextStepIndex] !== undefined){
            setStep(steps[nextStepIndex])
        } else {
            const profile = buildRequirementsProfile(updatedAnswers)
            sessionStorage.setItem("requirementsProfile", JSON.stringify(profile))
            router.push("/results")
        }
    }
    function renderStep(step: QuestionnaireStep){
        switch (step) {
            case "category":
                return <CategoryStep answers={answers} onAnswer={handleAnswer} />
            case "budget":
                return <BudgetStep answers={answers} onAnswer={handleAnswer} />
            case "longevity":
                return <LongevityStep answers={answers} onAnswer={handleAnswer} />
            case "os":
                return <OsStep answers={answers} onAnswer={handleAnswer} />
            case "tiles":
                return <TilesStep answers={answers} onAnswer={handleAnswer} />
            case "gaming_style":
                return <GamingStyleStep answers={answers} onAnswer={handleAnswer} />
            case "target_resolution":
                return <TargetResolutionStep answers={answers} onAnswer={handleAnswer} />
            case "ai_model_size":
                return <AiModelSizeStep answers={answers} onAnswer={handleAnswer} />
            default:
                const _exhaustiveCheck: never = step
                return null
            }
    }
    if(step === null){
        return (
            <div>
                <h1>Computer Recommendation Questionnaire</h1>
                <p>Find your next computer! Answer this ~5 min questionnaire and it will match you with your next computer system. Computer database updated as frequently as possible; might not be current to all market computer.</p>
                <button
                onClick={() => handleAnswer({})}>
                    Get Started
                </button>
            </div>
    )}
    return renderStep(step)
}

