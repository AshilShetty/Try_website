export function ResearchSection({ content }) {
  const orderedCards = [content.cards[2], content.cards[1], content.cards[0]];

  return (
    <div id="research-wrapper">
      <section id="research" className="scroll-section" aria-labelledby="research-title">
        <div className="bg-dots" aria-hidden="true" />
        <div className="section-wipe" aria-hidden="true" />
        <div className="section-atmo" aria-hidden="true">
          <span className="section-beam beam-a" />
          <span className="section-beam beam-b" />
          <span className="section-glow" />
        </div>

        <div className="res-left section-reveal">
          <span className="s-label">{content.label}</span>
          <h2 id="research-title" className="s-title">
            {content.title} <em>{content.accent}</em> {content.suffix}
          </h2>
          <div className="div-line" />
          <p className="res-copy">{content.description}</p>
          <div className="res-counter" aria-live="polite">
            <span className="res-counter-num" id="res-counter-num">
              01
            </span>
            <span className="res-counter-total">/ 03</span>
          </div>
          <div className="res-dots" aria-hidden="true">
            <div className="res-dot active" id="rd-0" />
            <div className="res-dot" id="rd-1" />
            <div className="res-dot" id="rd-2" />
          </div>
        </div>

        <div className="res-right">
          <div className="res-stack-wrap" id="res-stack-wrap">
            {orderedCards.map((card) => (
              <article className={`res-card${card.id === "rc-1" ? " is-front" : ""}`} id={card.id} key={card.id}>
                <div className="rc-tag">
                  <span className="rc-dot" />
                  {card.tag}
                </div>
                <div className="rc-body">
                  <h3 className="rc-title">{card.title}</h3>
                  <p className="rc-meta">
                    {card.meta}
                    <br />
                    {card.meta2}
                  </p>
                  <p className="rc-abstract">{card.abstract}</p>
                </div>
                <div className="rc-footer">
                  <a className="rc-read-link" href="#contact-wrapper">
                    Read Paper
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </a>
                  <span className="rc-card-num">{card.number}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
