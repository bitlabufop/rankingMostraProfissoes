import { useState, useEffect } from 'react'
import sheetsService from '../services/sheetsService'
import './Ranking.css'

export default function Ranking({ modality }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageFailed(false)
  }, [modality])

  useEffect(() => {
    let active = true

    const loadResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const modalityResults = await sheetsService.fetchResults(modality)
        const sorted = sheetsService.sortResults(
          modalityResults,
          modality.ordenacao,
        )
        if (active) setResults(sorted)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro desconhecido ao carregar resultados.'
        if (active) {
          setError(message)
          setResults([])
        }
        console.error('Erro ao carregar resultados:', err)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadResults()
    return () => {
      active = false
    }
  }, [modality])

  if (loading) {
    return <div className="ranking-loading">Carregando resultados...</div>
  }

  if (error) {
    return <div className="ranking-error" role="alert">{error}</div>
  }

  return (
    <section className="ranking">
      <div className="ranking-header">
        {modality.imagem && !imageFailed && (
          <img
            className="ranking-image"
            src={modality.imagem}
            alt={`Imagem da modalidade ${modality.nome}`}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="ranking-header-text">
          <h2>Classificação - {modality.nome}</h2>
          {modality.descricao && (
            <p className="ranking-description">{modality.descricao}</p>
          )}
          <p className="ranking-info">
            {modality.regra_premiacao} • Resultados em {modality.unidade}
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="ranking-empty">
          <p>Sem resultados registrados para esta modalidade</p>
        </div>
      ) : (
        <div className="ranking-table">
          <div className="ranking-header-row">
            <div className="col-position">Pos.</div>
            <div className="col-name">Participante</div>
            <div className="col-school">Escola</div>
            <div className="col-city">Cidade</div>
            <div className="col-result">
              Resultado ({modality.unidade})
            </div>
          </div>

          {results.map((result, index) => (
            <div
              key={`${result.modalidade_id}-${index}`}
              className={`ranking-row ${index === 0 ? 'winner' : ''}`}
            >
              <div className="col-position">
                <span className="position-badge">{index + 1}</span>
                {index === 0 && <span className="medal">🥇</span>}
                {index === 1 && <span className="medal">🥈</span>}
                {index === 2 && <span className="medal">🥉</span>}
              </div>
              <div className="col-name">
                <strong>{result.nome_participante}</strong>
                {(result.escola || result.cidade) && (
                  <span className="name-meta">
                    {[result.escola, result.cidade].filter(Boolean).join(' · ')}
                  </span>
                )}
              </div>
              <div className="col-school">{result.escola}</div>
              <div className="col-city">{result.cidade}</div>
              <div className="col-result">
                <span className="result-value">{result.resultado}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
