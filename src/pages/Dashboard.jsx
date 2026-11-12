import { useState, useEffect } from 'react'
import useEventData from '../hooks/useEventData'
import Header from '../components/Header'
import EventInfo from '../components/EventInfo'
import ModalityTabs from '../components/ModalityTabs'
import Ranking from '../components/Ranking'
import Loading from '../components/Loading'
import Error from '../components/Error'
import './Dashboard.css'

export default function Dashboard() {
  const { eventData, modalities, loading, error, lastUpdate, refetch } =
    useEventData()
  const [activeModality, setActiveModality] = useState(null)
  const [activeView, setActiveView] = useState('ranking')

  useEffect(() => {
    if (
      modalities.length > 0 &&
      !modalities.some((modality) => modality.id === activeModality)
    ) {
      setActiveModality(modalities[0].id)
    }
  }, [modalities, activeModality])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={refetch} />

  const selectedModality = modalities.find(
    (modality) => modality.id === activeModality,
  )

  return (
    <div className="dashboard">
      <Header eventData={eventData} lastUpdate={lastUpdate} onRefresh={refetch} />
      <main className="dashboard-main">
        <nav className="view-tabs" aria-label="Navegação principal">
          <button
            className={`view-tab ${activeView === 'ranking' ? 'active' : ''}`}
            onClick={() => setActiveView('ranking')}
            aria-current={activeView === 'ranking' ? 'page' : undefined}
          >
            🏆 Ranking
          </button>
          <button
            className={`view-tab ${activeView === 'about' ? 'active' : ''}`}
            onClick={() => setActiveView('about')}
            aria-current={activeView === 'about' ? 'page' : undefined}
          >
            ℹ️ Sobre
          </button>
        </nav>

        {activeView === 'ranking' && modalities.length === 0 ? (
          <div className="ranking-empty">
            Nenhuma aba de modalidade encontrada. Crie uma aba como `r1`.
          </div>
        ) : activeView === 'ranking' ? (
          <>
            <ModalityTabs
              modalities={modalities}
              activeModality={activeModality}
              onSelect={setActiveModality}
            />
            {selectedModality && <Ranking modality={selectedModality} />}
          </>
        ) : (
          <EventInfo eventData={eventData} />
        )}
      </main>
    </div>
  )
}
