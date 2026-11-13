const TOKEN = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*/g

function renderInline(text) {
  const nodes = []
  let last = 0

  for (const match of text.matchAll(TOKEN)) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    nodes.push(
      match[1] ? (
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      ) : (
        <strong key={match.index}>{match[3]}</strong>
      ),
    )
    last = match.index + match[0].length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

// Renderiza texto vindo da planilha: parágrafos por quebra de linha,
// links [texto](https://...) e **negrito**, sem HTML bruto.
export default function RichText({ text }) {
  return String(text ?? '')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => <p key={index}>{renderInline(line)}</p>)
}
