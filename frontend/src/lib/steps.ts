import QuestionnairePage from "@/app/questionnaire/page"
import type { QuestionnaireAnswers, QuestionnaireStep} from "./types"
import { Tiles } from "./tiles"

export function deriveSteps(answers: QuestionnaireAnswers){
    let steps: QuestionnaireStep[] = ["category" , "budget" , "longevity" , "os" , "tiles"]
    const selectedTiles = Tiles.filter(tile => answers.selectedTileIds.includes(tile.id))
    if(selectedTiles.some(tile => tile.gamingSignal)){
        steps.push("gaming_style")
    }
    if((answers.gamingStyle === "competitive") || (answers.gamingStyle === "demanding")){
        steps.push("target_resolution")
    }
    if(selectedTiles.some(tile => tile.aiSignal)){
        steps.push("ai_model_size")
    }
    return steps
}