import './ModalityTabs.css'

export default function ModalityTabs({ modalities, activeModality, onSelect }) {
  return (
    <section className="modality-tabs">
      <div className="tabs-container">
        {modalities.map((modality) => (
          <button
            key={modality.id}
            className={`tab ${activeModality === modality.id ? 'active' : ''}`}
            onClick={() => onSelect(modality.id)}
            title={modality.descricao}
          >
            <span className="tab-name">{modality.nome}</span>
            <span className="tab-icon">
              {modality.tipo_resultado === 'tempo' ? '⏱️' : '🎯'}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
