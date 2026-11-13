import './EventInfo.css'
import RichText from './RichText'

export default function EventInfo({ eventData }) {
  const hasDetails = eventData?.local || eventData?.data

  return (
    <section className="event-info">
      <div className="info-card">
        <p className="section-eyebrow">INFORMAÇÕES DO EVENTO</p>
        <h2>{eventData?.titulo || 'Mostra de Profissões'}</h2>
        {eventData?.descricao && (
          <div className="event-text">
            <RichText text={eventData.descricao} />
          </div>
        )}
        {hasDetails && (
          <div className="event-details">
            {eventData.data && (
              <div>
                <span>Data</span>
                <strong>{eventData.data}</strong>
              </div>
            )}
            {eventData.local && (
              <div>
                <span>Local</span>
                <strong>{eventData.local}</strong>
              </div>
            )}
          </div>
        )}
        {eventData?.avisos && (
          <div className="event-notice">
            <RichText text={eventData.avisos} />
          </div>
        )}
        {eventData?.como_funciona && (
          <>
            <h3>Como funciona</h3>
            <div className="event-text">
              <RichText text={eventData.como_funciona} />
            </div>
          </>
        )}
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
      </div>
    </section>
  )
}
