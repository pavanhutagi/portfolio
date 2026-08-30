import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-void px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase">404</p>
      <h1 className="font-display text-3xl font-light text-ink">Off the storyboard</h1>
      <p className="max-w-md text-sm text-muted">There is no camera keyframe for this route.</p>
      <Link
        href="/"
        className="rounded-full border border-accent px-5 py-2 font-mono text-xs tracking-[0.2em] text-accent uppercase transition-colors hover:bg-accent hover:text-void"
      >
        Back to the scene
      </Link>
    </main>
  );
}
