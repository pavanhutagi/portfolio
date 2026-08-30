"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-void px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase">Render error</p>
      <h1 className="font-display text-3xl font-light text-ink">The scene failed to start</h1>
      <p className="max-w-md text-sm text-muted">
        Something went wrong while initialising the renderer. Reloading usually clears it.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-accent px-5 py-2 font-mono text-xs tracking-[0.2em] text-accent uppercase transition-colors hover:bg-accent hover:text-void"
      >
        Try again
      </button>
    </main>
  );
}
