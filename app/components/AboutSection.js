export function AboutSection({ content }) {
  return (
    <div id="about-wrapper">
      <section id="about" className="scroll-section" aria-labelledby="about-title">
        <div className="bg-dots" aria-hidden="true" />
        <div className="section-wipe" aria-hidden="true" />
        <div className="section-atmo" aria-hidden="true">
          <span className="section-beam beam-a" />
          <span className="section-beam beam-b" />
          <span className="section-glow" />
        </div>
        <div id="about-inner">
          <div className="section-reveal">
            <span className="s-label">{content.label}</span>
            <h2 id="about-title" className="s-title">
              {content.title} <em>{content.accent}</em>
            </h2>
            <div className="div-line" />
            {content.paragraphs.map((paragraph) => (
              <p className="about-desc" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="about-stats" aria-label="Company stats">
            {content.stats.map((row, index) => (
              <div className="stat-row" key={`row-${index + 1}`}>
                {row.map((item) => (
                  <div className="stat-item" key={item.label}>
                    <span className="stat-num" data-value={item.value}>
                      {item.value}
                    </span>
                    <span className="stat-label">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
