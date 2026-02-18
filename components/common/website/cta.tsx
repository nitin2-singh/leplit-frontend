export default function CTA() {
  return (
    <section id="start" className="relative overflow-hidden py-32">
      {/* background glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      <div className="mx-auto max-w-4xl text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Start Coding in Seconds
        </h2>

        <p className="mt-4 text-lg text-muted-foreground">
          No setup. No installs. Just code in your browser.
        </p>

        <div className="mt-10 flex justify-center">
          <button className="rounded-full bg-black px-8 py-4 text-white text-lg font-medium hover:scale-[1.03] transition-transform dark:bg-white dark:text-black">
            Launch Leplit
          </button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Free to get started • No credit card required
        </p>
      </div>
    </section>
  );
}
