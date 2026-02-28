function SolutionIcon({ markup }) {
  return <svg className="sol-icon" viewBox="0 0 32 32" fill="none" dangerouslySetInnerHTML={{ __html: markup }} aria-hidden="true" />;
}

export function SolutionsSection({ content }) {
  return (
    <div id="solutions-wrapper">
      <section id="solutions" className="scroll-section" aria-labelledby="solutions-title">
        <div className="bg-dots" aria-hidden="true" />
        <div className="section-wipe" aria-hidden="true" />
        <div className="section-atmo" aria-hidden="true">
          <span className="section-beam beam-a" />
          <span className="section-beam beam-b" />
          <span className="section-glow" />
        </div>
        <div className="sol-top section-reveal" id="sol-top">
          <span className="s-label">{content.label}</span>
          <h2 id="solutions-title" className="s-title">
            {content.title} <em>{content.accent}</em>
          </h2>
        </div>
        <div className="sol-cards">
          {content.cards.map((card, index) => (
            <article className={`sol-card${index === 0 ? " active" : ""}`} id={card.id} key={card.id}>
              <span className="sol-n">{card.number}</span>
              <SolutionIcon markup={card.icon} />
              <h3 className="sol-t">{card.title}</h3>
              <p className="sol-d">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
