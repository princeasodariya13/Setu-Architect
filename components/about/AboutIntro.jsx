export default function AboutIntro() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-xl uppercase tracking-wide mb-4 font-display font-semibold text-neutral-900">General History</h2>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            SETU ARCHITECTURE was established in 1988.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed">
            We specialize in structural and earth-retaining design of residential,
            commercial, industrial, and public-related structures, as well as MEPF design.
          </p>
        </div>

        <div>
          <h2 className="text-xl uppercase tracking-wide mb-4 font-display font-semibold text-neutral-900">Design Principle</h2>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            We are professionals, not businessmen.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            We believe that any building design by an architect has its own importance,
            functionality, and uniqueness.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed">
            We respect the effort of the architect and client, so we suggest the
            structural system in a way that does not disturb the soul of the building.
          </p>
        </div>
      </div>
    </section>
  );
}
