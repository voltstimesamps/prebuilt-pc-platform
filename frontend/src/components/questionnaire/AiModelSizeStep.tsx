import { useState } from 'react';
import { QuestionnaireAnswers, AiModelSize } from "@/lib/types";

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>)  => void;
}

function AiModelSizeStep({ answers, onAnswer}: Props){
    const [ selected, setSelected ] = useState<AiModelSize | null>(answers.aiModelSize ?? null)
    const options = [
        {value: "small" as AiModelSize, label: "Small (7-13B Parameters)"},
        {value: "mid" as AiModelSize, label: "Medium (14-34B Parameters)"},
        {value: "large" as AiModelSize, label: "Large (35-70B Parameters)"}
    ]
    return(
        <div>
            <h2>What is your target model size?</h2>
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
                onClick={() => onAnswer({ aiModelSize: selected})}
                disabled={selected === null}
            >
                Continue
            </button>
        </div>
    )
}

export default AiModelSizeStep