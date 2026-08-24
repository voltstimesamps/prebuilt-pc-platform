import { useState } from 'react';
import { QuestionnaireAnswers, TargetResolution } from '@/lib/types';

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>)  => void;
}

function TargetResolutionStep({ answers, onAnswer}: Props){
    const [ selected, setSelected ] = useState<TargetResolution | null>(answers.targetResolution ?? null)
    const options = [
        {value: "4k" as TargetResolution, label: "4K (Ultra HD)"},
        {value: "1440p" as TargetResolution, label: "1440p (Quad HD)"},
        {value: "1080p" as TargetResolution, label: "1080p (Full HD)"}
    ]
    return(
        <div>
            <h2>What is your target resolution?</h2>
            <div>
                {options.map(option =>(
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
                onClick={() => onAnswer({ targetResolution: selected})}
                disabled={selected === null}
            >
                Continue
            </button>
        </div>
    )
}

export default TargetResolutionStep