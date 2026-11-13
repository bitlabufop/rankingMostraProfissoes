import { useState } from 'react'
import './EventInfo.css'

function TeamMember({ member }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initials = member.nome
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <article className="team-member">
      {member.imagem && !imageFailed ? (
        <img
          src={member.imagem}
          alt={`Foto de ${member.nome}`}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="team-avatar-fallback" aria-hidden="true">
          {initials}
        </div>
      )}
      <h4>{member.nome}</h4>
      {member.funcao && <span className="team-role">{member.funcao}</span>}
      {member.bio && <p>{member.bio}</p>}
      <div className="team-links">
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        )}
      </div>
    </article>
  )
}

export default function About({ team = [] }) {
  return (
    <section className="event-info">
      <div className="info-card">
        <section className="community-card" aria-labelledby="community-title">
          <div className="community-copy">
            <p className="section-eyebrow">PROGRAMA PRÓ-ATIVA · UFOP</p>
            <h3 id="community-title">BitLab — eletrônica na prática</h3>
            <p>
              O BitLab é um projeto do Programa Pró-Ativa, vinculado à área de
              Eletrônica do curso de Engenharia Elétrica do ICEA/UFOP, em João
              Monlevade. O projeto desenvolve dispositivos e protótipos para
              mostrar, na prática, como os circuitos eletrônicos funcionam e
              como são usados em projetos de robótica educacional e fabricação
              digital.
            </p>
            <p>
              Em palestras e eventos, esses dispositivos são usados tanto em
              demonstrações quanto em jogos e competições. Assim, o público
              pode observar os circuitos em funcionamento, interagir com os
              protótipos e colocá-los à prova em desafios. Com essas
              atividades, o BitLab busca despertar a curiosidade pela
              eletrônica e o interesse pela Engenharia Elétrica.
            </p>
          </div>
          {team.length > 0 && (
            <div className="team-grid">
              {team.map((member, index) => (
                <TeamMember member={member} key={`${member.nome}-${index}`} />
              ))}
            </div>
          )}
          <nav className="community-links" aria-label="Redes e projetos">
            <a
              className="community-link"
              href="https://github.com/bitlabufop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="community-icon" aria-hidden="true">
                {'</>'}
              </span>
              <span className="community-link-text">
                <strong>BitLab no GitHub</strong>
                <small>Projetos e código</small>
              </span>
              <span className="community-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              className="community-link"
              href="https://www.instagram.com/deelt_ufop/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="community-icon" aria-hidden="true">◎</span>
              <span className="community-link-text">
                <strong>DEELT no Instagram</strong>
                <small>Novidades do departamento</small>
              </span>
              <span className="community-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              className="community-link"
              href="https://www.youtube.com/@deelt_ufop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="community-icon" aria-hidden="true">▶</span>
              <span className="community-link-text">
                <strong>DEELT no YouTube</strong>
                <small>Vídeos do departamento</small>
              </span>
              <span className="community-arrow" aria-hidden="true">↗</span>
            </a>
          </nav>
        </section>
      </div>
    </section>
  )
}
