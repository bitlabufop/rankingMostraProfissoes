# Guia de Configuração e Primeiros Passos

## ✅ Pré-requisitos

1. **Node.js 16+** - [Download aqui](https://nodejs.org/)
2. **npm** - Vem com Node.js
3. **Git** (opcional, para versionar)

## 🚀 Instalação e Execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O site abrirá em `http://localhost:5173`

### 3. Build para produção

```bash
npm run build
```

Isso gera a pasta `dist/` pronta para o GitHub Pages.

## 📊 Leitura da planilha Google Sheets

A aplicação lê em modo somente leitura as abas de modalidade no padrão `r1`,
`r2` etc. e a aba `dash` (equipe e informações do evento). O formato de
cabeçalhos e validações está em `docs/SHEET_STRUCTURE.md`.

### Configuração local

1. Compartilhe a planilha com acesso de visualização para qualquer pessoa com o link.
2. Copie `.env.example` para `.env.local`. O ID já está preenchido; adicione sua chave em `VITE_GOOGLE_API_KEY`.
3. Inclua `http://localhost:5173/*` nos referenciadores permitidos da chave para testar localmente.
4. Reinicie o servidor de desenvolvimento depois de alterar `.env.local`.

> Variáveis `VITE_*` são incluídas no JavaScript do site e podem ser vistas no navegador. A chave não é secreta no cliente: mantenha as restrições de API e de domínio. Não versione `.env.local`.

### Deploy no GitHub Pages

Crie o segredo `GOOGLE_API_KEY` em **Settings > Secrets and variables >
Actions** no repositório. O workflow injeta esse segredo no build; o ID da
planilha já está configurado. Permita também `https://bitlabufop.github.io/*`
nos referenciadores da chave.

## 📁 Estrutura do Código

```
src/
├── components/          # Componentes React (Header, Ranking, etc)
├── pages/              # Páginas (Dashboard)
├── services/           # Serviços (sheetsService)
├── hooks/              # Hooks customizados (useEventData)
├── styles/             # CSS global
├── config/             # Configurações
└── App.jsx             # Componente raiz
```

## 🎨 Design System

Cores e variáveis em `src/styles/global.css`:
- **Primary:** #00d9e8 (Ciano)
- **Secondary:** #0b1c34 (Azul-marinho)
- **Accent:** #ffb000 (Dourado)

## 🧪 Comandos Disponíveis

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Visualiza build local
npm run test       # Executa testes
npm run lint       # Verifica estilo do código
npm run format     # Formata código automaticamente
```

## 📦 Deploy no GitHub Pages

Quando tiver tudo pronto:

1. Faça `git push` para a branch `main`
2. GitHub Actions vai fazer build automaticamente (veja `.github/workflows/deploy.yml`)
3. Site fica disponível em `https://bitlabufop.github.io/rankingMostraProfissoes/`

## ❓ Dúvidas?

- Componentes responsivos ✅
- Leitura das abas `rN` e `dash` da planilha ✅
- Atualização manual pelo botão no cabeçalho
- Design energético e moderno ✅

Instale as dependências e rode `npm run dev` para iniciar o projeto localmente.
