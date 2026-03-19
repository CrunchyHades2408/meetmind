const GlassCard = ({ children, className = '', hover = false, bright = false, onClick }) => {
  const base = 'glass rounded-2xl'
  const hoverClass = hover ? 'glass-hover cursor-pointer' : ''
  const brightClass = bright ? 'glass-bright' : ''

  return (
    <div
      className={`${base} ${hoverClass} ${brightClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default GlassCard