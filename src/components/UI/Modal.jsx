import { useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import GlassCard from './GlassCard'
import Badge from './Badge'
import Button from './Button'

const Modal = () => {
  const { activeModal, closeModal } = useApp()

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal() }
    if (activeModal) {
      document.addEventListener('keydown', handler)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [activeModal, closeModal])

  if (!activeModal) return null

  const m = activeModal

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col animate-slide-up">
        <GlassCard bright className="flex flex-col overflow-hidden glow-silver">

          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-white/6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Badge label={m.tag} />
                <span className="text-xs text-silver-500">{m.date} · {m.duration}</span>
              </div>
              <h2 className="font-display font-bold text-xl text-silver-100 leading-tight">
                {m.title}
              </h2>
              <div className="flex flex-wrap gap-1 mt-1">
                {m.participants.map((p, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/7 text-silver-400"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={closeModal}
              className="text-silver-500 hover:text-silver-100 transition-colors p-1.5 hover:bg-white/5 rounded-lg ml-4 flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 p-6 space-y-5">

            {/* Summary */}
            <section>
              <SectionLabel icon="📋" label="Summary" />
              <p className="text-sm text-silver-300 leading-relaxed mt-2">{m.summary}</p>
            </section>

            {/* Decisions */}
            <section>
              <SectionLabel icon="⚡" label="Key Decisions" />
              <ul className="mt-2 space-y-2">
                {m.decisions.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-silver-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-silver-400 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </section>

            {/* Action Items */}
            <section>
              <SectionLabel icon="✅" label="Action Items" />
              <div className="mt-2 space-y-2">
                {m.actionItems.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.025] border border-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-silver-300">
                          {a.owner.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-silver-200">{a.task}</p>
                        <p className="text-xs text-silver-500">{a.owner}</p>
                      </div>
                    </div>
                    <span className="text-xs text-silver-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 flex-shrink-0 ml-3">
                      {a.due}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/6 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={closeModal}>Close</Button>
            <Button size="sm">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </Button>
          </div>

        </GlassCard>
      </div>
    </div>
  )
}

const SectionLabel = ({ icon, label }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm">{icon}</span>
    <span className="text-xs font-bold uppercase tracking-widest text-silver-500">{label}</span>
    <div className="flex-1 h-px bg-white/5" />
  </div>
)

export default Modal