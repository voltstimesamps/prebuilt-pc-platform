import { useState } from 'react';
import { QuestionnaireAnswers, SystemCategory } from "@/lib/types";

const MAX_BUDGET = 5000

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>) => void;
}


function BudgetStep({ answers, onAnswer }: Props) {
    const [selected, setSelected] = useState<number>(answers.budgetUsd ?? MAX_BUDGET / 2)
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">What is your budget?</h2>
            <div>
                <input type="range"
                    className="w-2/3 accent-accent-copper"
                    min={0}
                    max={MAX_BUDGET}
                    step={10}
                    value={selected}
                    onChange={(e) => setSelected(Number(e.target.value))}
                />
                <input type="number"
                    className="bg-panel border border-hairline text-text-primary font-body px-3 py-2 rounded-md w-32 focus:outline-none focus:border-accent-teal"
                    min={0}
                    max={MAX_BUDGET}
                    step={10}
                    value={selected}
                    onChange={(e) => {
                        const parsed = Number(e.target.value)
                        if (isNaN(parsed) || e.target.value === "") {
                            setSelected(0)
                        } else {
                            setSelected(parsed)
                        }
                    }} />
            </div>

            <button
                onClick={() => onAnswer({ budgetUsd: selected })}
                className="border border-accent-copper text-accent-copper font-heading px-4 py-2 hover:bg-accent-copper hover:text-bg transition-colors"
            >
                Continue
            </button>
        </div>
    )
}
export default BudgetStep