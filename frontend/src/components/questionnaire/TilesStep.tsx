import { useState } from 'react';
import { QuestionnaireAnswers } from '@/lib/types';
import { Tiles } from '@/lib/tiles';

interface Props {
    answers: QuestionnaireAnswers
    onAnswer: (update: Partial<QuestionnaireAnswers>) => void;
}

function TilesStep({ answers, onAnswer }: Props) {
    const [localSelected, setLocalSelected] = useState<string[]>(answers.selectedTileIds)
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">What apps do you use?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
                {Tiles.map((tile) =>
                    <button
                        key={tile.id}
                        onClick={() => {
                            if (localSelected.includes(tile.id)) {
                                setLocalSelected(localSelected.filter(id => id !== tile.id))
                            } else {
                                setLocalSelected([...localSelected, tile.id])
                            }
                        }}
                        className={`rounded-lg px-4 py-6 font-body text-center transition-colors
                    ${localSelected.includes(tile.id)
                                ? "bg-accent-copper text-bg"
                                : "bg-panel text-text-primary hover:bg-hairline"
                            }`}
                    >
                        {tile.label}
                    </button>)}
            </div>
            <button
                onClick={() => onAnswer({ selectedTileIds: localSelected })}
                className="border border-accent-copper text-accent-copper font-heading px-4 py-2 hover:bg-accent-copper hover:text-bg transition-colors disabled:opacity-40 disabled:pointer-events-none"
                disabled={localSelected.length === 0}
            >
                Continue
            </button>
        </div>
    )
}

export default TilesStep