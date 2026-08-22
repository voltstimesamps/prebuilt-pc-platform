import { useState } from 'react';
import { QuestionnaireAnswers, SystemCategory } from "@/lib/types";

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>)  => void;
}

export function CategoryStep( { answers, onAnswer }: Props){
    const [selected, setSelected] = useState<SystemCategory | null>(answers.category)
    const options = [
        { value: "desktop" as SystemCategory, label: "Desktop" },
        { value: "workstation" as SystemCategory, label: "Workstation" },
        { value: "laptop" as SystemCategory, label: "Laptop" },
        { value: "mini_pc" as SystemCategory, label: "Mini PC"}
    ]
    return (
        <div>
            <h2>What type of computer are you looking for?</h2>
            <div>
                {options.map((option) =>(
                    <button 
                    key={option.value}
                    onClick={() => setSelected(option.value)}
                    className={option.value === selected ? "selected" : ""}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <button
                onClick={() => onAnswer({ category: selected})}
                disabled={selected === null}
            >
                Continue
            </button>
        </div>
    )
}