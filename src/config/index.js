// Configurações da aplicação
const env = import.meta.env

export const CONFIG = {
  // Google Sheets
  SHEETS: {
    SPREADSHEET_ID: env.VITE_GOOGLE_SHEETS_ID || '',
    API_KEY: env.VITE_GOOGLE_API_KEY || '',
  },
  
  // Atualização de dados
  REFRESH: {
    INTERVAL_MS: 60000, // 1 minuto
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 5000,
  },
  
  // Aplicação
  APP: {
    NAME: 'Ranking Mostra de Profissões 2026',
    DESCRIPTION: 'Engenharia Elétrica',
  },
}

export default CONFIG
