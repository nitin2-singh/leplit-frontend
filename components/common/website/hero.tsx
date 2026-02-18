export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-32">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

      {/* Glow */}
      <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-linear-to-r from-blue-500/30 to-purple-500/30 blur-3xl -z-10" />

      <div className="relative mx-auto max-w-4xl text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Build, Run & Debug
          <br />
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Code in the Cloud
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Leplit is a modern online IDE with real-time terminals, file syncing,
          and secure containerized environments — all in your browser.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="rounded-full bg-black px-8 py-3 text-white text-sm font-medium hover:scale-[1.02] transition-transform dark:bg-white dark:text-black">
            Start Coding
          </button>

          <button className="rounded-full border px-8 py-3 text-sm font-medium hover:bg-muted transition">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}
