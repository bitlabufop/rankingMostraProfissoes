import CONFIG from '../config'

const API_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets'

function getCredentials() {
  const { SPREADSHEET_ID, API_KEY } = CONFIG.SHEETS

  if (!SPREADSHEET_ID || !API_KEY) {
    throw new Error(
      'Configure VITE_GOOGLE_SHEETS_ID e VITE_GOOGLE_API_KEY no arquivo .env.local.',
    )
  }

  return { spreadsheetId: SPREADSHEET_ID, apiKey: API_KEY }
}

async function requestJson(url) {
  let response

  try {
    response = await fetch(url)
  } catch {
    throw new Error(
      'Não foi possível acessar a Google Sheets API. Verifique a conexão e se o domínio atual está permitido na chave.',
    )
  }

  const data = await response.json()

  if (!response.ok) {
    const message = data.error?.message || `Erro HTTP ${response.status}`
    throw new Error(`Google Sheets API: ${message}`)
  }

  return data
}

function normalizeHeader(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
}

function normalizeOrder(value, title) {
  const order = normalizeHeader(value)

  if (order === 'ascendente' || order === 'asc') return 'asc'
  // Mantém compatibilidade com a grafia já usada nas abas r1 e r2.
  if (order === 'ascentendente') return 'asc'
  if (order === 'descendente' || order === 'desc') return 'desc'

  throw new Error(
    `Aba "${title}": ordenacao inválida ("${value}"). Use "ascendente" ou "descendente"`,
  )
}

function getMetadataValue(headers, values, field, errors, required = true) {
  const column = headers.findIndex((header) => normalizeHeader(header) === field)

  if (column === -1) {
    if (required) errors.push(`coluna "${field}" ausente`)
    return ''
  }

  const value = String(values[column] ?? '').trim()
  if (required && !value) errors.push(`campo "${field}" vazio`)
  return value
}

function parseModality(title, rows) {
  const headers = rows[0] || []
  const values = rows[1] || []
  const errors = []

  const nome = getMetadataValue(headers, values, 'nome', errors)
  const descricao = getMetadataValue(
    headers,
    values,
    'descricao',
    errors,
  )
  const imagem = getMetadataValue(
    headers,
    values,
    'imagem',
    errors,
    false,
  )
  const tipoResultado = normalizeHeader(
    getMetadataValue(headers, values, 'tipo_resultado', errors),
  )
  const unidade = getMetadataValue(
    headers,
    values,
    'unidade',
    errors,
  )
  const ordenacaoValue = getMetadataValue(
    headers,
    values,
    'ordenacao',
    errors,
  )
  const posicaoValue = getMetadataValue(
    headers,
    values,
    'posicao_no_site',
    errors,
  )
  const regraPremiacao = getMetadataValue(
    headers,
    values,
    'regra_premiacao',
    errors,
  )

  if (tipoResultado && !['tempo', 'pontos'].includes(tipoResultado)) {
    errors.push(`tipo_resultado inválido ("${tipoResultado}")`)
  }

  let ordenacao = null
  if (ordenacaoValue) {
    try {
      ordenacao = normalizeOrder(ordenacaoValue, title)
    } catch (error) {
      errors.push(error.message.replace(`Aba "${title}": `, ''))
    }
  }

  const posicao = Number(posicaoValue)
  if (posicaoValue && !Number.isFinite(posicao)) {
    errors.push(`posicao no site inválida ("${posicaoValue}")`)
  }

  if (errors.length > 0) {
    throw new Error(`Aba "${title}": ${errors.join('; ')}.`)
  }

  return {
    id: title,
    sheetName: title,
    nome,
    descricao,
    imagem: toImageUrl(imagem),
    tipo_resultado: tipoResultado,
    unidade,
    ordenacao,
    posicao,
    regra_premiacao: regraPremiacao,
  }
}

function parseNumericResult(value, modality, rowNumber) {
  const text = String(value ?? '').trim()

  if (modality.tipo_resultado === 'tempo' && text.includes(':')) {
    const parts = text.split(':')
    if (
      (parts.length !== 2 && parts.length !== 3) ||
      parts.some((part) => !/^\d+(?:[.,]\d+)?$/.test(part))
    ) {
      throw new Error(
        `Aba "${modality.sheetName}", linha ${rowNumber}: tempo inválido ("${text}"). Use uma duração como 1:31:00.`,
      )
    }

    const numbers = parts.map((part) => Number(part.replace(',', '.')))
    const seconds =
      numbers.length === 3
        ? numbers[0] * 3600 + numbers[1] * 60 + numbers[2]
        : numbers[0] * 60 + numbers[1]

    if (numbers[numbers.length - 1] >= 60 || (numbers.length === 3 && numbers[1] >= 60)) {
      throw new Error(
        `Aba "${modality.sheetName}", linha ${rowNumber}: tempo inválido ("${text}").`,
      )
    }

    return { display: text, sortValue: seconds }
  }

  const normalized = text.includes(',')
    ? text.replace(/\./g, '').replace(',', '.')
    : text.replace(/,/g, '')
  const number = Number(normalized)

  if (!text || !Number.isFinite(number)) {
    const hint =
      text.includes(':') && modality.tipo_resultado !== 'tempo'
        ? ' Para valores como 1:31:00, defina tipo_resultado como "tempo" na linha 2 da aba.'
        : ''
    throw new Error(
      `Aba "${modality.sheetName}", linha ${rowNumber}: resultado inválido ("${text}").${hint}`,
    )
  }

  return { display: text, sortValue: number }
}

async function fetchSpreadsheetMetadata(spreadsheetId, apiKey) {
  const params = new URLSearchParams({
    fields: 'sheets.properties.title',
    key: apiKey,
  })
  const url = `${API_BASE_URL}/${encodeURIComponent(spreadsheetId)}?${params}`
  return requestJson(url)
}

async function fetchRanges(spreadsheetId, apiKey, ranges) {
  const params = new URLSearchParams({
    valueRenderOption: 'FORMATTED_VALUE',
    key: apiKey,
  })
  ranges.forEach((range) => params.append('ranges', range))

  const url = `${API_BASE_URL}/${encodeURIComponent(spreadsheetId)}/values:batchGet?${params}`
  return requestJson(url)
}

function isHttpUrl(value) {
  return /^https?:\/\/\S+$/i.test(value)
}

// Converte links de compartilhamento do Google Drive em URLs de imagem exibíveis.
function toImageUrl(value) {
  const url = String(value ?? '').trim()
  if (!isHttpUrl(url)) return ''

  const driveId =
    url.match(/drive\.google\.com\/file\/d\/([\w-]+)/)?.[1] ||
    url.match(/drive\.google\.com\/(?:open|uc|thumbnail)\?[^#]*\bid=([\w-]+)/)?.[1]

  return driveId
    ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w400`
    : url
}

const EVENT_FIELDS = {
  titulo: 'titulo',
  descricao: 'descricao',
  local: 'local',
  data: 'data',
  como_funciona: 'como_funciona',
  avisos: 'avisos',
}

// Lê a aba `dash`: blocos "Equipe" (tabela) e "Evento" (campo/valor).
// Novas linhas na equipe são aceitas automaticamente até a primeira linha em branco.
export function parseDashboard(rows) {
  const event = {}
  const team = []
  let section = null
  let headers = null

  rows.forEach((row = []) => {
    const cells = row.map((cell) => String(cell ?? '').trim())
    const isBlank = !cells.some(Boolean)
    const heading = normalizeHeader(cells[0])

    if (heading === 'equipe' && !cells[1]) {
      section = 'team'
      headers = null
      return
    }
    if (heading === 'evento' && !cells[1]) {
      section = 'event'
      return
    }
    if (isBlank) {
      if (section === 'team' && headers) section = null
      return
    }

    if (section === 'team') {
      if (!headers) {
        headers = cells.map(normalizeHeader)
        return
      }
      const get = (field) => cells[headers.indexOf(field)] ?? ''
      const nome = get('nome')
      if (!nome) return

      team.push({
        nome,
        funcao: get('funcao'),
        bio: get('bio'),
        github: isHttpUrl(get('github')) ? get('github') : '',
        linkedin: isHttpUrl(get('linkedin')) ? get('linkedin') : '',
        imagem: toImageUrl(get('imagem')),
      })
    } else if (section === 'event') {
      const field = EVENT_FIELDS[normalizeHeader(cells[0])]
      if (field && cells[1]) event[field] = cells[1]
    }
  })

  return { ...event, equipe: team }
}

export const sheetsService = {
  async fetchEventData() {
    const { spreadsheetId, apiKey } = getCredentials()

    try {
      const response = await fetchRanges(spreadsheetId, apiKey, ["'dash'!A1:H100"])
      return parseDashboard(response.valueRanges?.[0]?.values || [])
    } catch (error) {
      // A ausência da aba `dash` não deve impedir a exibição dos rankings.
      console.warn('Não foi possível ler a aba dash:', error)
      return null
    }
  },

  async fetchModalities() {
    const { spreadsheetId, apiKey } = getCredentials()
    const spreadsheet = await fetchSpreadsheetMetadata(spreadsheetId, apiKey)
    const sheetNames = (spreadsheet.sheets || [])
      .map((sheet) => sheet.properties?.title)
      .filter((title) => /^r\d+$/i.test(title || ''))

    if (sheetNames.length === 0) return []

    const ranges = sheetNames.map((name) => `'${name}'!A1:H2`)
    const response = await fetchRanges(spreadsheetId, apiKey, ranges)
    const modalities = []
    const modalityErrors = []
    sheetNames.forEach((name, index) => {
      try {
        modalities.push(
          parseModality(name, response.valueRanges?.[index]?.values || []),
        )
      } catch (error) {
        modalityErrors.push(error.message)
      }
    })

    if (modalityErrors.length > 0) {
      throw new Error(modalityErrors.join(' '))
    }

    const positions = new Set()

    modalities.forEach((modality) => {
      if (positions.has(modality.posicao)) {
        throw new Error(
          `Aba "${modality.sheetName}": posicao no site ${modality.posicao} já está sendo usada por outra modalidade.`,
        )
      }
      positions.add(modality.posicao)
    })

    return modalities.sort((a, b) => a.posicao - b.posicao)
  },

  async fetchResults(modality) {
    if (!modality?.sheetName) {
      throw new Error('Não foi possível identificar a aba da modalidade.')
    }

    const { spreadsheetId, apiKey } = getCredentials()
    const response = await fetchRanges(spreadsheetId, apiKey, [
      `'${modality.sheetName}'!A4:E`,
    ])
    const rows = response.valueRanges?.[0]?.values || []

    return rows.flatMap((row, index) => {
      if (!row.some((cell) => String(cell ?? '').trim())) return []

      const rowNumber = index + 4
      const nome = String(row[0] ?? '').trim()
      const rawResult = row[3]

      if (!nome) {
        throw new Error(
          `Aba "${modality.sheetName}", linha ${rowNumber}: nome_participante está vazio.`,
        )
      }

      const parsedResult = parseNumericResult(rawResult, modality, rowNumber)

      return [
        {
          modalidade_id: modality.id,
          nome_participante: nome,
          escola: String(row[1] ?? '').trim(),
          cidade: String(row[2] ?? '').trim(),
          resultado: parsedResult.display,
          valor_ordenacao: parsedResult.sortValue,
          data_atualizacao: String(row[4] ?? '').trim(),
        },
      ]
    })
  },

  sortResults(results, orderType = 'desc') {
    const order = orderType === 'ascendente' ? 'asc' : orderType
    return [...results].sort((a, b) =>
      order === 'asc'
        ? a.valor_ordenacao - b.valor_ordenacao
        : b.valor_ordenacao - a.valor_ordenacao,
    )
  },
}

export default sheetsService
