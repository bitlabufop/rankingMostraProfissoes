import './Header.css'

export default function Header({ eventData, lastUpdate, onRefresh }) {
  const formatTime = (date) => {
    if (!date) return 'Nunca'
    return date.toLocaleTimeString('pt-BR')
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-info">
          <h1 className="header-title">
            ⚡ {eventData?.titulo || 'Mostra de Profissões'}
          </h1>
        </div>
        <div className="header-controls">
          <div className="last-update">
            🔄 Última atualização: {formatTime(lastUpdate)}
          </div>
          <button
            className="btn-refresh"
            onClick={onRefresh}
            title="Atualizar dados"
            aria-label="Atualizar dados"
          >
            🔃
          </button>
        </div>
      </div>
    </header>
  )
}
