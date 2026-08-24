import { useState } from 'react';
import { QuestionnaireAnswers, GamingStyle } from '@/lib/types';

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>)  => void;
}

function GamingStyleStep({ answers, onAnswer}: Props){
    const [selected, setSelected] = useState<GamingStyle | null>(answers.gamingStyle ?? null)
    const options = [
        { value: "regular" as GamingStyle, label: "Regular"},
        { value: "competitive" as GamingStyle, label: "Competitive"},
        { value: "demanding" as GamingStyle, label: "Demanding"}
    ]
    return(
        <div>
            <h2>What is your gaming style?</h2>
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
                onClick={() => onAnswer({ gamingStyle: selected})}
                disabled={selected === null}
            >
                Continue
            </button>
        </div>
    )
}

export default GamingStyleStep