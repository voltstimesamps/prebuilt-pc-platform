interface Props {
    onSelect: (level: "low" | "medium" | "high") => void
}

function FamiliarityStep({ onSelect }: Props) {
    return (
        <div>
            <h2 className="font-heading text-2xl text-text-primary mb-4">How familiar are you with computers?</h2>
            <div className="flex flex-col gap-3">
                <button
                    onClick={() => onSelect("low")}
                    className="border rounded-md px-4 py-3 font-body text-text-primary bg-panel border-hairline hover:border-accent-teal transition-colors text-left">
                    I don't know much (leads to a guided quiz)
                </button>
                <button
                    onClick={() => onSelect("medium")}
                    className="border rounded-md px-4 py-3 font-body text-text-primary bg-panel border-hairline hover:border-accent-teal transition-colors text-left">
                    I could tell you a bit (leads to an unguided quiz)
                </button>
                <button
                    onClick={() => onSelect("high")}
                    className="border rounded-md px-4 py-3 font-body text-text-primary bg-panel border-hairline hover:border-accent-teal transition-colors text-left">
                    I know computers (leads to a direct search mode)
                </button>
            </div>
        </div>
    )
}

export default FamiliarityStep