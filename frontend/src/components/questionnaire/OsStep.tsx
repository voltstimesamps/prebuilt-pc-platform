import { useState } from 'react';
import { QuestionnaireAnswers, OsPreference } from "@/lib/types";

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>) => void;
}

function OsStep({ answers, onAnswer }: Props) {
    const [selected, setSelected] = useState<OsPreference | null>(answers.osPreference)
    const options = [
        { value: "windows" as OsPreference, label: "Windows" },
        { value: "macos" as OsPreference, label: "macOS" },
        { value: "linux" as OsPreference, label: "Linux" },
        { value: "none" as OsPreference, label: "No Preference" }
    ]
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">What operating system do you want?</h2>
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
                onClick={() => onAnswer({ osPreference: selected })}
                disabled={selected === null}
            >
                Continue
            </button>
        </div>
    )
}

export default OsStep