const STACK = [
  "Next.js",
  "TypeScript",
  "Socket.IO",
  "Node.js",
  "Docker",
  "xterm.js",
  "node-pty",
];

export default function Stack() {
  return (
    <section id="stack" className="relative py-32 bg-muted/40">
      {/* subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight">
          Built on a Modern Stack
        </h2>

        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Carefully chosen technologies to ensure performance, scalability, and
          developer happiness.
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-full border bg-background px-5 py-2 text-sm font-medium transition hover:bg-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
