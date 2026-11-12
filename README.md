# Ranking Mostra de Profissões 2026

## 📁 Estrutura do Projeto

```
rankingMostraProfissoes/
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Serviços (API, Google Sheets)
│   ├── hooks/           # Hooks customizados
│   ├── styles/          # Estilos CSS
│   ├── utils/           # Funções utilitárias
│   ├── config/          # Configurações da app
│   ├── App.jsx          # Componente raiz
│   └── main.jsx         # Ponto de entrada
├── public/
│   └── assets/          # Imagens, ícones, etc
├── tests/               # Testes unitários e integração
├── .github/workflows/   # CI/CD do GitHub Actions
├── docs/                # Documentação
├── index.html           # HTML principal
├── vite.config.js       # Configuração do Vite
├── package.json         # Dependências
└── README.md            # Este arquivo
```

## 🚀 Começando

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/bitlabufop/rankingMostraProfissoes.git
cd rankingMostraProfissoes

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir http://localhost:5173
```

### Build para Produção

```bash
# Compilar para GitHub Pages
npm run build

# Visualizar build local
npm run preview
```

## 📝 TODO

- [ ] Configurar Google Sheets API
- [ ] Implementar componentes principais (Dashboard, Modalidades, Ranking)
- [ ] Integrar com planilha Google
- [ ] Implementar atualização automática de dados
- [ ] Criar design responsivo
- [ ] Implementar testes
- [ ] Configurar GitHub Actions para deploy
- [ ] Documentar organização da planilha
- [ ] Publicar no GitHub Pages

## 🎨 Stack Tecnológico

- **Frontend:** React 18 + Vite
- **Estilização:** CSS puro com design system
- **Build:** Vite
- **Testes:** Vitest
- **Hosting:** GitHub Pages

## 📋 Requisitos

Veja [github.md](./github.md) para os requisitos completos do projeto.

## 📄 Licença

MIT
