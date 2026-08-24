import { useState } from 'react';
import { QuestionnaireAnswers, SystemCategory } from "@/lib/types";
import { parse } from 'path';

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>)  => void;
}
function LongevityStep({ answers, onAnswer }: Props){
    const [selected, setSelected ] = useState<number | null>(answers.longevityYears)
    const options = [1, 2, 3, 4, 5]
    const [isOther, setIsOther] = useState<boolean>(false)
    return(
        <div>
            <h2>How long should your computer last?</h2>
            <div>
                {options.map((option) =>(
                    <button
                    key={option}
                    onClick={() => {setSelected(option); setIsOther(false);}}
                    className={option === selected && !isOther ? "selected" : ""}
                    >   {option}
                    </button>
                ))}
                <button
                onClick={() => { setIsOther(true); setSelected(null); }}
                >
                    Other
                </button>
                {isOther && <input 
                type="number"
                min={1}
                max={10}
                value={selected ?? ""}
                onChange={(e) => {
                    const parsed = Number(e.target.value)
                    if(isNaN(parsed) || e.target.value === ""){
                        setSelected(null)
                    } else {
                        setSelected(parsed)
                    }
                }
                }/>}
            </div>
            <button
                onClick={() => onAnswer({ longevityYears: selected})}
                disabled={selected === null}
            >
                Continue
            </button>
        </div>
    )
}

export default LongevityStep
