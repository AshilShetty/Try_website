export function TeamSection({ content }) {
  return (
    <div id="team-wrapper">
      <section id="team" className="scroll-section" aria-labelledby="team-title">
        <div className="bg-dots" aria-hidden="true" />
        <div className="section-wipe" aria-hidden="true" />
        <div className="section-atmo" aria-hidden="true">
          <span className="section-beam beam-a" />
          <span className="section-beam beam-b" />
          <span className="section-glow" />
        </div>
        <div className="team-top section-reveal" id="team-top">
          <span className="s-label">{content.label}</span>
          <h2 id="team-title" className="s-title">
            {content.title} <em>{content.accent}</em> {content.suffix}
          </h2>
        </div>
        <div className="team-grid">
          {content.members.map((member) => (
            <article className="team-card" id={member.id} key={member.id}>
              <div className="t-av" aria-hidden="true">
                {member.initials}
              </div>
              <h3 className="t-name">{member.name}</h3>
              <p className="t-role">{member.role}</p>
              <p className="t-bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
