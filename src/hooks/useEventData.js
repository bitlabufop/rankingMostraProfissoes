import { useState, useEffect } from 'react'
import sheetsService from '../services/sheetsService'

export function useEventData() {
  const [eventData, setEventData] = useState(null)
  const [modalities, setModalities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [eventRes, modalitiesRes] = await Promise.all([
        sheetsService.fetchEventData(),
        sheetsService.fetchModalities(),
      ])

      setEventData(eventRes)
      setModalities(modalitiesRes.sort((a, b) => a.posicao - b.posicao))
      setLastUpdate(new Date())
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro desconhecido ao carregar a planilha.'
      setError(message)
      setEventData(null)
      setModalities([])
      console.error('Erro ao carregar dados da planilha:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return {
    eventData,
    modalities,
    loading,
    error,
    lastUpdate,
    refetch: loadData,
  }
}

export default useEventData
