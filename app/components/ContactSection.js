export function ContactSection({ content }) {
  return (
    <section id="contact-wrapper">
      <div id="contact" aria-labelledby="contact-title">
        <div className="bg-dots" aria-hidden="true" />
        <div className="section-wipe" aria-hidden="true" />
        <div className="section-atmo" aria-hidden="true">
          <span className="section-beam beam-a" />
          <span className="section-beam beam-b" />
          <span className="section-glow" />
        </div>
        <div className="contact-wrap">
          <div className="contact-top section-reveal">
            <span className="s-label">{content.label}</span>
            <h2 id="contact-title" className="s-title">
              {content.title} <em>{content.accent}</em>
            </h2>
            <div className="div-line" />
            <p className="contact-copy">{content.description}</p>
          </div>

          <form className="contact-grid" onSubmit={(event) => event.preventDefault()}>
            {content.fields.map((field) => (
              <div className="c-field" key={field.id}>
                <label className="c-label" htmlFor={field.id}>
                  {field.label}
                </label>
                <input id={field.id} className="c-input" type={field.type} placeholder={field.placeholder} autoComplete="off" />
              </div>
            ))}

            <div className="c-field full">
              <label className="c-label" htmlFor={content.message.id}>
                {content.message.label}
              </label>
              <textarea id={content.message.id} className="c-ta" placeholder={content.message.placeholder} />
            </div>

            <button type="submit" className="c-btn" aria-label="Send contact message">
              Send Message
            </button>
          </form>

          <footer className="footer">
            <span className="footer-copy">{content.copyright}</span>
            <span className="footer-logo">GG</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
