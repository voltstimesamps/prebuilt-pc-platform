import { useState } from 'react';
import { QuestionnaireAnswers, TargetResolution } from '@/lib/types';

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>) => void;
}

function TargetResolutionStep({ answers, onAnswer }: Props) {
    const [selected, setSelected] = useState<TargetResolution | null>(answers.targetResolution ?? null)
    const options = [
        { value: "4k" as TargetResolution, label: "4K (Ultra HD)" },
        { value: "1440p" as TargetResolution, label: "1440p (Quad HD)" },
        { value: "1080p" as TargetResolution, label: "1080p (Full HD)" }
    ]
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">What is your target resolution?</h2>
            <div className="flex flex-col gap-3">
                {options.map(option => (
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
                onClick={() => onAnswer({ targetResolution: selected })}
                disabled={selected === null}
                className="border border-accent-copper text-accent-copper font-heading px-4 py-2 hover:bg-accent-copper hover:text-bg transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
                Continue
            </button>
        </div>
    )
}

export default TargetResolutionStep