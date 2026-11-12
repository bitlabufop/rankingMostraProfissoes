# Estrutura da Planilha Google Sheets

A planilha terá uma aba geral chamada `dash` e uma aba para cada modalidade. O
colaborador poderá criar ou excluir abas de modalidade sem manter uma lista
central de modalidades.

> A aplicação lê as abas `rN` em modo somente leitura. A aba `dash` permanece
> vazia e reservada para uma etapa futura.

## Aba `dash`

A aba `dash` será reservada às informações gerais do evento. Seus campos e
organização serão definidos posteriormente. Não cadastre modalidades nem
resultados nela.

## Abas de modalidades

Crie uma aba para cada modalidade, com nomes no padrão `r1`, `r2`, `r3` e assim
por diante. Cada aba deve seguir o mesmo formato. A aplicação identifica as
abas `r` seguidas de um número que existirem na planilha; abas excluídas deixam
de aparecer após atualizar os dados. Não é necessário manter uma lista de abas
em outro lugar.

### Cabeçalho da modalidade

Nas linhas 1 e 2, informe os campos da modalidade e seus valores:

| Coluna | Cabeçalho (linha 1) | Valor (linha 2) | Validação |
|---|---|---|---|
| A | `nome` | Nome exibido da modalidade | Obrigatório |
| B | `descricao` | Descrição curta | Obrigatório |
| C | `Imagem` | URL da imagem | URL válida ou vazio |
| D | `tipo_resultado` | `tempo` ou `pontos` | Obrigatório |
| E | `unidade` | Unidade exibida, como `s` ou `pt` | Obrigatório |
| F | `ordenacao` | `ascendente` ou `descendente` | Obrigatório |
| G | `posicao no site` | Número de exibição | Número único |
| H | `regra_premiacao` | Regra resumida, como “Menor tempo vence” | Obrigatório |

`ascendente` significa que o menor resultado fica primeiro; `descendente`
significa que o maior resultado fica primeiro. Use `ascendente` para tempos em
que o menor vence e `descendente` para pontuações em que o maior vence.

### Resultados dos participantes

Na linha 3, coloque os cabeçalhos dos resultados. A partir da linha 4, cada
linha representa um participante:

| Coluna | Cabeçalho (linha 3) | Conteúdo |
|---|---|---|
| A | `nome_participante` | Nome ou apelido do participante/equipe |
| B | `escola` | Escola ou instituição |
| C | `cidade` | Cidade |
| D | `resultado` | Pontuação ou tempo |
| E | `data_atualizacao` | Data e hora do registro |

O significado e a ordenação de `resultado` vêm do cabeçalho da própria aba; não
é necessário repetir `modalidade_id` em cada linha. Para `pontos`, informe um
valor numérico. Para `tempo`, use uma duração real do Google Sheets exibida como
`[h]:mm:ss` (por exemplo, `1:31:00`), não um texto digitado. Assim a duração pode
ser validada e ordenada corretamente.

## Exemplo

Na aba `r1`, a linha 2 pode identificar uma modalidade de tempo:

| nome | descricao | Imagem | tipo_resultado | unidade | ordenacao | posicao no site | regra_premiacao |
|---|---|---|---|---|---:|---:|---|
| Garra Robótica | Organize os blocos em menor tempo | URL da imagem | tempo | s | ascendente | 1 | Menor tempo vence |

As linhas de participantes começam na linha 4:

| nome_participante | escola | cidade | resultado | data_atualizacao |
|---|---|---|---|---|
| Participante 1 | CTU | Juiz de Fora | 1:31:00 | 12/11/2026 15:22 |
| Participante 2 | CTU | Juiz de Fora | 1:30:00 | 12/11/2026 15:25 |

Para outra modalidade, crie `r2` com os mesmos cabeçalhos e informe seus próprios
metadados e resultados. A posição é definida pelo valor `posicao no site`.

## Regras para preenchimento

- Não renomeie os cabeçalhos nem altere a posição das linhas descritas.
- Preencha todos os metadados obrigatórios da linha 2.
- Use `tempo` ou `pontos` em `tipo_resultado` e `ascendente` ou `descendente` em
  `ordenacao`.
- Use valores numéricos para pontos e células de duração do Google Sheets para
  tempos; não inclua a unidade junto do valor.
- Cada modalidade deve ter uma posição no site única.
- Não inclua dados pessoais sensíveis, como e-mails ou telefones.
