// Funções utilitárias
// TODO: Implementar funções para:
// - Formatação de dados
// - Ordenação de resultados
// - Tratamento de desempates
// - Formatação de datas e horas

export function sortResults(results, type = 'asc') {
  return [...results].sort((a, b) => {
    if (type === 'desc') return b.score - a.score
    return a.score - b.score
  })
}

export default {
  sortResults,
}
