import { TAG_COLORS, TAG_TEXT_COLORS } from '../../data/mockData'

const Badge = ({ label, className = '' }) => {
  const bg = TAG_COLORS[label] || 'rgba(180,190,210,0.1)'
  const color = TAG_TEXT_COLORS[label] || '#c8cdd6'

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full
        text-xs font-semibold tracking-wide
        border border-white/5
        ${className}
      `}
      style={{ background: bg, color }}
    >
      {label}
    </span>
  )
}

export default Badge