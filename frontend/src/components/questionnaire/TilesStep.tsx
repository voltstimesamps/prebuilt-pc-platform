import { useState } from 'react';
import { QuestionnaireAnswers } from '@/lib/types';
import { Tiles } from '@/lib/tiles';

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>)  => void;
}

function TilesStep({ answers, onAnswer}: Props){
    const [ localSelected,setLocalSelected ] = useState<string[]>(answers.selectedTileIds)
    return(
        <div>
            <h2>What apps do you use?</h2>
                <div>
                {Tiles.map((tile) =>
                <button
                key={tile.id}
                onClick={() => {
                    if(localSelected.includes(tile.id)){
                        setLocalSelected(localSelected.filter( id => id !== tile.id))
                    } else {
                        setLocalSelected([...localSelected, tile.id])
                    }
                }}
                className={localSelected.includes(tile.id) ? "selected" : ""}
                >
                    {tile.label}
                </button>)}
                </div>
                <button
                onClick={() => onAnswer({ selectedTileIds: localSelected})}
                className={localSelected.length > 0 ? "selected" : ""}
                disabled={localSelected.length === 0}
                >
                    Continue
                </button>
        </div>
    )
}

export default TilesStep