import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Compass size={32} className="mb-4 text-ink-mute" />
      <h1 className="text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-sm text-ink-dim">This part of the roadmap doesn't exist yet.</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        Back to roadmap
      </Link>
    </main>
  );
}
