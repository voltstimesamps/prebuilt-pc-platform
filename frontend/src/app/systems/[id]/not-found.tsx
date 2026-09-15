import Link from "next/link";

export default function NotFound() {
    return (
        <div className="max-w-5x1 mx-auto px-6 py-10 text-center">
            <p className="text-text-muted mb-4">System not found.</p>
            <Link href="/results" className="border border-accent-teal text-accent-teal px-4 py-2">
                ← Back to results
            </Link>
        </div>
    )
}