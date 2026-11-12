import './EventInfo.css'

export default function EventInfo({ eventData }) {
  return (
    <section className="event-info">
      <div className="info-card">
        <p className="section-eyebrow">INFORMAÇÕES DO EVENTO</p>
        <h2>{eventData?.titulo || 'Mostra de Profissões'}</h2>
        <p>
          Acompanhe a classificação das competições da Mostra de Profissões.
          Escolha uma modalidade na aba Ranking para conferir os resultados.
        </p>
        <div className="event-details">
          <div>
            <span>Área</span>
            <strong>{eventData?.descricao || '—'}</strong>
          </div>
          <div>
            <span>Local</span>
            <strong>{eventData?.local || '—'}</strong>
          </div>
          <div>
            <span>Data</span>
            <strong>{eventData?.data || '—'}</strong>
          </div>
        </div>
        {eventData?.avisos && (
          <div className="event-notice">{eventData.avisos}</div>
        )}
        <h3>Como funciona</h3>
        <div className="info-rules">
          <div className="rule-item">
            <span className="rule-icon">🏆</span>
            <div>
              <strong>Vencedor</strong>
              <p>O primeiro colocado aparece no topo da classificação.</p>
            </div>
          </div>
          <div className="rule-item">
            <span className="rule-icon">⚙️</span>
            <div>
              <strong>Critérios</strong>
              <p>Cada modalidade tem seu próprio critério de pontuação.</p>
            </div>
          </div>
          <div className="rule-item">
            <span className="rule-icon">🎯</span>
            <div>
              <strong>Desempate</strong>
              <p>Em caso de empate, será feita uma tentativa adicional.</p>
            </div>
          </div>
        </div>
        <section className="community-card" aria-labelledby="community-title">
          <div className="community-copy">
            <p className="section-eyebrow">EXTENSÃO · UFOP</p>
            <h3 id="community-title">Tecnologia feita em comunidade</h3>
            <p>
              O BitLab é um projeto de extensão do ICEA/UFOP que aproxima
              engenharia, robótica e tecnologia da comunidade.
            </p>
          </div>
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
