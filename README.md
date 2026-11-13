# Ranking Mostra de Profissões

Site de acompanhamento de rankings de jogos e desafios em eventos, mantido pelo
[BitLab](https://github.com/bitlabufop) (ICEA/UFOP). Todo o conteúdo — equipe,
informações do evento, modalidades e resultados — vem de uma **planilha Google
Sheets**, então o mesmo site pode ser reutilizado em vários eventos sem alterar
o código.

O site tem três abas: **Ranking** (classificação por modalidade), **Sobre**
(BitLab e equipe) e **Evento** (informações da mostra).

## 📊 Como atualizar a planilha

A planilha é lida em modo somente leitura. Alterou algo? Use o botão de
atualizar no cabeçalho do site para recarregar os dados.

Estrutura completa e validações: [docs/SHEET_STRUCTURE.md](./docs/SHEET_STRUCTURE.md).

### Abas da planilha

| Aba | Para que serve |
|---|---|
| `dash` | Informações gerais: bloco **Equipe** e bloco **Evento** |
| `r1`, `r2`, `r3`… | Uma aba por modalidade (nome sempre `r` + número) |

Para criar uma modalidade, duplique uma aba `rN` existente e renomeie para o
próximo número. Para remover, exclua a aba. Não existe lista central.

### Aba de modalidade (`rN`)

**Linhas 1 e 2** — cabeçalhos e valores da modalidade (não renomeie os
cabeçalhos nem mude a posição das linhas):

| Cabeçalho | O que preencher |
|---|---|
| `nome` | Nome exibido |
| `descricao` | Descrição curta |
| `Imagem` | URL da imagem (opcional) |
| `tipo_resultado` | **`tempo`** ou **`pontos`** (ver abaixo) |
| `unidade` | Unidade mostrada ao lado do resultado, como `s` ou `pt` |
| `ordenacao` | **`ascendente`** ou **`descendente`** (ver abaixo) |
| `posicao no site` | Número de exibição; **não pode repetir** entre abas |
| `regra_premiacao` | Texto curto, como "Menor tempo vence" |

**Linha 3** — cabeçalhos dos resultados. **A partir da linha 4**, um
participante por linha:

| `nome_participante` | `escola` | `cidade` | `resultado` | `data_atualizacao` |
|---|---|---|---|---|

#### ⚠️ Campos que exigem atenção

- **`tipo_resultado`** define como a coluna `resultado` é lida:
  - `pontos`: números (`10`, `7,5`). Não escreva a unidade junto do valor.
  - `tempo`: duração real do Google Sheets, formatada como `[h]:mm:ss` (ex.:
    `1:31:00`) ou `mm:ss`. **Não digite como texto**; use
    *Formatar > Número > Duração*. Segundos em 60 ou mais são rejeitados.
- **`ordenacao`** define quem fica em primeiro lugar:
  - `ascendente`: **menor** resultado vence. Use para **tempo**.
  - `descendente`: **maior** resultado vence. Use para **pontos**.
- **`unidade`** é só rótulo de exibição (`s`, `pt`, `min`…); não altera a
  ordenação nem a leitura dos valores.

Um erro nesses campos (valor inválido, campo vazio, posição repetida ou
resultado ilegível) **bloqueia o carregamento** e o site mostra uma mensagem
indicando a aba e a linha com problema.

### Aba `dash`

Dois blocos, identificados pelo texto da primeira coluna:

- **`Equipe`**: abaixo do título, uma linha de cabeçalhos (`Item`, `Nome`,
  `Função`, `Bio`, `Github`, `Linkedin`, `Imagem`) e um membro por linha. Para
  aumentar a equipe, basta preencher novas linhas; o bloco termina na primeira
  linha em branco. Linhas sem `Nome` são ignoradas.
- **`Evento`**: uma linha por campo, nome na coluna A e valor na B: `Título`,
  `Descrição`, `Local`, `Data`, `Como funciona` e, opcionalmente, `Avisos`.

Textos longos aceitam quebras de linha (parágrafos), links
`[texto](https://...)` e `**negrito**`.

**Fotos da equipe:** cole o link de compartilhamento do Google Drive e deixe o
arquivo com acesso *"qualquer pessoa com o link"*. Sem foto (ou se o link
falhar), o site mostra as iniciais.

## 💻 Como rodar localmente

### Pré-requisitos
- Node.js 18 ou superior
- npm
- Uma chave da Google Sheets API (ver abaixo)

### Passo a passo

```bash
git clone https://github.com/bitlabufop/rankingMostraProfissoes.git
cd rankingMostraProfissoes
npm install
```

1. Copie `.env.example` para `.env.local` e preencha:

   ```env
   VITE_GOOGLE_SHEETS_ID=<id da planilha>
   VITE_GOOGLE_API_KEY=<sua chave da Google Sheets API>
   ```

   O ID é o trecho entre `/d/` e `/edit` na URL da planilha.
2. Compartilhe a planilha como **"qualquer pessoa com o link pode ver"**.
3. Na [chave de API](https://console.cloud.google.com/apis/credentials),
   restrinja o uso à *Google Sheets API* e inclua `http://localhost:5173/*` nos
   referenciadores permitidos.
4. Inicie o servidor:

   ```bash
   npm run dev
   # abra http://localhost:5173/rankingMostraProfissoes/
   ```

   Reinicie o servidor sempre que alterar o `.env.local`.

> **Windows (PowerShell) sem `node` no PATH?** Se o Node foi instalado com o
> `fnm`, rode antes: `$env:Path = "$env:APPDATA\fnm\node-versions\<versão>\installation;$env:Path"`
> e use `npm.cmd` no lugar de `npm`.

### Comandos

| Comando | Função |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm test` | Testes (Vitest) |
| `npm run build` | Gera a pasta `dist/` |
| `npm run preview` | Visualiza o build localmente |

## 🚀 Deploy (GitHub Pages)

O deploy é automático a cada push na `main`, pelo workflow
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

1. Em **Settings > Secrets and variables > Actions**, crie o segredo
   `GOOGLE_API_KEY` com a chave da API.
2. Permita `https://bitlabufop.github.io/*` nos referenciadores da chave.
3. O site fica em `https://bitlabufop.github.io/rankingMostraProfissoes/`.

### Usar em outro evento

1. Copie a planilha modelo e preencha as abas `dash` e `rN`.
2. Troque o ID da planilha em `VITE_GOOGLE_SHEETS_ID` (`.env.local` localmente
   e a variável `VITE_GOOGLE_SHEETS_ID` em `deploy.yml` para o deploy).
3. Texto institucional do BitLab (aba **Sobre**) fica em
   `src/components/About.jsx`; o restante vem da planilha.

## 🔒 Segurança e boas práticas

- Variáveis `VITE_*` ficam visíveis no JavaScript do site. A chave **não é
  secreta** no navegador: mantenha as restrições de API e de domínio e **não
  versione** o `.env.local`.
- A planilha é pública para leitura. **Não inclua dados pessoais sensíveis**
  (e-mails, telefones) nela.
- Os dados são atualizados manualmente pelo botão do cabeçalho (não há
  atualização automática).

## 🎨 Stack

React 18 + Vite, CSS puro, Vitest, GitHub Pages.

```
src/
├── components/   # About, EventInfo, Ranking, ModalityTabs, Header…
├── pages/        # Dashboard (abas Ranking / Sobre / Evento)
├── services/     # sheetsService: leitura e validação da planilha
├── hooks/        # useEventData
├── config/       # Variáveis de ambiente
└── styles/       # CSS global
```

Requisitos do projeto: [github.md](./github.md).

## 📄 Licença

MIT
