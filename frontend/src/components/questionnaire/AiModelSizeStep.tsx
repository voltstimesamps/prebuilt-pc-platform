import { useState } from 'react';
import { QuestionnaireAnswers, AiModelSize } from "@/lib/types";

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>) => void;
}

function AiModelSizeStep({ answers, onAnswer }: Props) {
    const [selected, setSelected] = useState<AiModelSize | null>(answers.aiModelSize ?? null)
    const options = [
        { value: "small" as AiModelSize, label: "Small (7-13B Parameters)" },
        { value: "mid" as AiModelSize, label: "Medium (14-34B Parameters)" },
        { value: "large" as AiModelSize, label: "Large (35-70B Parameters)" }
    ]
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">What is your target model size?</h2>
            <div className="flex flex-col gap-3 mb-6">
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
                onClick={() => onAnswer({ aiModelSize: selected })}
                disabled={selected === null}
                className="border border-accent-copper text-accent-copper font-heading px-4 py-2 hover:bg-accent-copper hover:text-bg transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
                Continue
            </button>
        </div>
    )
}

export default AiModelSizeStep