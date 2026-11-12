import './Error.css'

export default function Error({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Oops! Algo deu errado</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="btn-retry" onClick={onRetry}>
          Tentar Novamente
        </button>
      )}
    </div>
  )
}
