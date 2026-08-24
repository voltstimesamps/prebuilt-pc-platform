import { useState } from 'react';
import { QuestionnaireAnswers, OsPreference } from "@/lib/types";

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>)  => void;
}

function OsStep({ answers, onAnswer}: Props){
    const [ selected, setSelected ] = useState<OsPreference | null>(answers.osPreference)
    const options = [
        { value: "windows" as OsPreference, label: "Windows" },
        { value: "macos" as OsPreference, label: "macOS" },
        { value: "linux" as OsPreference, label: "Linux" },
        { value: "none" as OsPreference, label: "No Preference"}
    ]
    return(
        <div>
            <h2>What operating system do you want?</h2>
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
                onClick={() => onAnswer({ osPreference: selected})}
                disabled={selected === null}
                >
                    Continue
                </button>
        </div>
    )
}

export default OsStep