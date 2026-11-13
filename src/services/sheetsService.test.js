import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../config', () => ({
  default: {
    SHEETS: {
      SPREADSHEET_ID: 'test-spreadsheet',
      API_KEY: 'test-api-key',
    },
  },
}))

import sheetsService, { parseDashboard } from './sheetsService'

const modalityHeaders = [
  'nome',
  'descricao',
  'Imagem',
  'tipo_resultado',
  'unidade',
  'ordenacao',
  'posicao no site',
  'regra_premiacao',
  'github',
]

const jsonResponse = (data) => ({
  ok: true,
  json: async () => data,
})

describe('sheetsService', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('descobre as abas rN e ordena modalidades pela posição configurada', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(
          jsonResponse({
            sheets: [
              { properties: { title: 'dash' } },
              { properties: { title: 'r2' } },
              { properties: { title: 'notas' } },
              { properties: { title: 'r1' } },
            ],
          }),
        )
        .mockResolvedValueOnce(
          jsonResponse({
            valueRanges: [
              {
                values: [
                  modalityHeaders,
                  [
                    'Gincana',
                    'Desafio em equipe',
                    '',
                    'pontos',
                    'pt',
                    'descendente',
                    '2',
                    'Maior pontuação vence',
                    'https://github.com/bitlabufop/fpgaBomberman',
                  ],
                ],
              },
              {
                values: [
                  modalityHeaders,
                  [
                    'Eletroway',
                    'Corrida de carros',
                    '',
                    'tempo',
                    's',
                    'ascentendente',
                    '1',
                    'Menor tempo vence',
                    '',
                  ],
                ],
              },
            ],
          }),
        ),
    )

    const modalities = await sheetsService.fetchModalities()

    expect(modalities.map((modality) => modality.id)).toEqual(['r1', 'r2'])
    expect(modalities[0].ordenacao).toBe('asc')
    expect(modalities[1].github).toBe(
      'https://github.com/bitlabufop/fpgaBomberman',
    )
    const requestedRanges = new URL(fetch.mock.calls[1][0]).searchParams.getAll(
      'ranges',
    )
    expect(requestedRanges).toContain("'r2'!A1:I2")
  })

  it('lê resultados de tempo e ordena pela duração, não pelo texto', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(
      jsonResponse({
        valueRanges: [
          {
            values: [
              ['Participante 1', 'Escola', 'Cidade', '1:31:00', '12/11/2026 15:19'],
              ['Participante 2', 'Escola', 'Cidade', '1:15:00', '12/11/2026 15:20'],
            ],
          },
        ],
      }),
    ))

    const modality = {
      id: 'r1',
      sheetName: 'r1',
      tipo_resultado: 'tempo',
      ordenacao: 'asc',
    }
    const results = await sheetsService.fetchResults(modality)
    const sorted = sheetsService.sortResults(results, modality.ordenacao)

    expect(sorted.map((result) => result.nome_participante)).toEqual([
      'Participante 2',
      'Participante 1',
    ])
    expect(sorted[0].resultado).toBe('1:15:00')
  })

  it('rejeita ordenação fora dos valores definidos na planilha', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(
          jsonResponse({ sheets: [{ properties: { title: 'r1' } }] }),
        )
        .mockResolvedValueOnce(
          jsonResponse({
            valueRanges: [
              {
                values: [
                  modalityHeaders,
                  ['Eletroway', 'Corrida', '', 'tempo', 's', 'aleatorio', '1', 'Menor tempo vence'],
                ],
              },
            ],
          }),
        ),
    )

    await expect(sheetsService.fetchModalities()).rejects.toThrow(
      'ordenacao inválida ("aleatorio")',
    )
  })

  it('lê equipe e evento da aba dash, aceitando novos membros', () => {
    const data = parseDashboard([
      ['Equipe'],
      ['Item', 'Nome', 'Função', 'Bio', 'Github', 'Linkedin', 'Imagem'],
      ['1', 'Ana Lima', 'Orientadora', 'Bio A', 'https://github.com/ana', '', 'https://drive.google.com/file/d/abc_123/view?usp=sharing'],
      ['2', 'Bruno', 'Colaborador', 'Bio B', 'javascript:alert(1)'],
      ['3'],
      [],
      ['Evento'],
      ['Título', 'Mostra'],
      ['Descrição', 'Linha 1\n\nLinha 2'],
      ['Como funciona', 'Regras'],
    ])

    expect(data.equipe.map((member) => member.nome)).toEqual(['Ana Lima', 'Bruno'])
    expect(data.equipe[0].imagem).toBe(
      'https://drive.google.com/thumbnail?id=abc_123&sz=w400',
    )
    expect(data.equipe[1].github).toBe('')
    expect(data.titulo).toBe('Mostra')
    expect(data.descricao).toBe('Linha 1\n\nLinha 2')
    expect(data.como_funciona).toBe('Regras')
  })
})
