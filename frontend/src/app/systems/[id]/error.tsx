"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="max-w-5x1 mx-auto px-6 py-10 text-center">
            <p className="text-text-muted mb-4">Something went wrong lodaing this system.</p>
            <button onClick={reset} className="border borser-accent-teal text-accent-teal px-4 py-2">
                Try Again
            </button>
        </div>
    )
}