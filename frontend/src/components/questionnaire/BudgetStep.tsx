import { useState } from 'react';
import { QuestionnaireAnswers, SystemCategory } from "@/lib/types";

const MAX_BUDGET = 5000

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>)  => void;
}


function BudgetStep({ answers, onAnswer }: Props){
    const [selected, setSelected] = useState<number>(answers.budgetUsd ?? MAX_BUDGET / 2)
    return (
        <div>
            <h2>What is your budget?</h2>
            <div>
                <input type="range"
                min={0}
                max={MAX_BUDGET}
                step={50}
                value={selected}
                onChange={(e) => setSelected(Number(e.target.value))}
                />
                <input type="number"
                min={0}
                max={MAX_BUDGET}
                step={50}
                value={selected}
                onChange={(e) => {
                    const parsed = Number(e.target.value)
                    if(isNaN(parsed) || e.target.value === ""){
                        setSelected(0)
                    } else {
                        setSelected(parsed)
                    }
                }}/>
            </div>
            
            <button
                onClick={() => onAnswer({ budgetUsd: selected})}
            >
                Continue
            </button>
        </div>
    )
}
export default BudgetStep