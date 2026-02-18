import { Terminal, FolderSync, Box, Zap, Code2, Users } from "lucide-react";

const FEATURES = [
  {
    title: "Instant Terminal",
    desc: "Fully interactive terminal powered by xterm.js and node-pty.",
    icon: Terminal,
  },
  {
    title: "Live File Sync",
    desc: "Real-time filesystem updates using WebSockets.",
    icon: FolderSync,
  },
  {
    title: "Docker Sandboxes",
    desc: "Secure, isolated containers for every project.",
    icon: Box,
  },
  {
    title: "Next.js Powered",
    desc: "Blazing fast UI with server-side rendering.",
    icon: Zap,
  },
  {
    title: "TypeScript First",
    desc: "End-to-end type safety across the stack.",
    icon: Code2,
  },
  {
    title: "Collaboration Ready",
    desc: "Built for real-time multi-user coding sessions.",
    icon: Users,
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32">
      {/* subtle background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-muted/40" />

      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight">
          Everything you need to code in the cloud
        </h2>

        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          A powerful feature set designed for modern developers and teams.
        </p>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-2xl border bg-background p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* glow */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-0 blur-xl transition group-hover:opacity-100" />

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
