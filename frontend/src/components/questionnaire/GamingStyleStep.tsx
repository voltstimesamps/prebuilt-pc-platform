import { useState } from 'react';
import { QuestionnaireAnswers, GamingStyle } from '@/lib/types';

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>) => void;
}

function GamingStyleStep({ answers, onAnswer }: Props) {
    const [selected, setSelected] = useState<GamingStyle | null>(answers.gamingStyle ?? null)
    const options = [
        { value: "regular" as GamingStyle, label: "Regular" },
        { value: "competitive" as GamingStyle, label: "Competitive" },
        { value: "demanding" as GamingStyle, label: "Demanding" }
    ]
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">What is your gaming style?</h2>
            <div className="flex flex-col gap-3">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => setSelected(option.value)}
                        className={`border rounded-md px-4 py-3 font-body text-text-primary transition-colors
                            ${option.value === selected
                                ? "border-accent-copper bg-accent-copper/10 text-accent-copper"
                                : "bg-panel border-hairline hover:border-accent-teal"
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <button
                className="border border-accent-copper text-accent-copper font-heading px-4 py-2 hover:bg-accent-copper hover:text-bg transition-colors disabled:opacity-40 disabled:pointer-events-none"
                onClick={() => onAnswer({ gamingStyle: selected })}
                disabled={selected === null}
            >
                Continue
            </button>
        </div>
    )
}

export default GamingStyleStep