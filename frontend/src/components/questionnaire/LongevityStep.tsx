import { useState } from 'react';
import { QuestionnaireAnswers, SystemCategory } from "@/lib/types";
import { parse } from 'path';

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>) => void;
}
function LongevityStep({ answers, onAnswer }: Props) {
    const [selected, setSelected] = useState<number | null>(answers.longevityYears)
    const options = [1, 2, 3, 4, 5]
    const [isOther, setIsOther] = useState<boolean>(false)
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">How many years should your computer last?</h2>
            <div className="flex flex-wrap gap-3 mb-6">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => { setSelected(option); setIsOther(false); }}
                        className={`border rounded-md px-4 py-3 font-body text-text-primary transition-colors 
                                ${option === selected && !isOther
                                ? "border-accent-copper bg-accent-copper/10 text-accent-copper"
                                : "bg-panel border-hairline hover:border-accent-teal"
                            }`}
                    >   {option}
                    </button>
                ))}
                <button
                    onClick={() => { setIsOther(true); setSelected(null); }}
                    className={`border rounded-md px-4 py-3 font-body text-text-primary transition-colors ${isOther
                        ? "border-accent-copper bg-accent-copper/10 text-accent-copper"
                        : "bg-panel border-hairline hover:border-accent-teal"
                        }`}
                >
                    Other
                </button>
                {isOther && <input
                    className="bg-panel border border-hairline text-text-primary font-body px-3 py-2 rounded-md w-32 focus:outline-none focus:border-accent-teal"
                    type="number"
                    min={1}
                    max={10}
                    value={selected ?? ""}
                    onChange={(e) => {
                        const parsed = Number(e.target.value)
                        if (isNaN(parsed) || e.target.value === "") {
                            setSelected(null)
                        } else {
                            setSelected(parsed)
                        }
                    }
                    } />}
            </div>
            <button
                className="border border-accent-copper text-accent-copper font-heading px-4 py-2 hover:bg-accent-copper hover:text-bg transition-colors disabled:opacity-40 disabled:pointer-events-none"
                onClick={() => onAnswer({ longevityYears: selected })}
                disabled={selected === null}
            >
                Continue
            </button>
        </div>
    )
}

export default LongevityStep
