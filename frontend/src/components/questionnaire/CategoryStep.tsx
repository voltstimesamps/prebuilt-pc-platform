import { useState } from 'react';
import { QuestionnaireAnswers, SystemCategory } from "@/lib/types";

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>) => void;
}

function CategoryStep({ answers, onAnswer }: Props) {
    const [selected, setSelected] = useState<SystemCategory | null>(answers.category)
    const options = [
        { value: "desktop" as SystemCategory, label: "Desktop" },
        { value: "workstation" as SystemCategory, label: "Workstation" },
        { value: "laptop" as SystemCategory, label: "Laptop" },
        { value: "mini_pc" as SystemCategory, label: "Mini PC" }
    ]
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">What type of computer are you looking for?</h2>
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
                onClick={() => onAnswer({ category: selected })}
                disabled={selected === null}
                className="border border-accent-copper text-accent-copper font-heading px-4 py-2 hover:bg-accent-copper hover:text-bg transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
                Continue
            </button>
        </div>
    )
}

export default CategoryStep