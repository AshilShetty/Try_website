export function HeroSection({ content }) {
  return (
    <div id="hero-wrapper">
      <section id="hero" aria-label="Hero">
        <canvas id="grid-canvas" aria-hidden="true" />
        <div className="section-wipe" aria-hidden="true" />
        <div className="hero-aura" aria-hidden="true" />
        <div id="hero-logo">
          <span className="hl-eyebrow">{content.eyebrow}</span>
          <h1 className="hl-title">
            <span className="hl-line">{content.title[0]}</span>
            <span className="hl-line">{content.title[1]}</span>
          </h1>
          <p className="hl-sub">{content.subtitle}</p>
        </div>
        <div id="scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="sh-line" />
        </div>
      </section>
    </div>
  );
}
