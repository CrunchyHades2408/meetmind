import GlassCard from '../UI/GlassCard'

const Skeleton = () => (
  <div className="space-y-3">
    {[80, 60, 90, 50].map((w, i) => (
      <div
        key={i}
        className="h-3 rounded-full shimmer-bar"
        style={{ width: `${w}%` }}
      />
    ))}
  </div>
)

const SectionHeader = ({ icon, label, count }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span className="text-sm">{icon}</span>
    </div>
    <span className="text-xs font-bold uppercase tracking-widest text-silver-500">
      {label}
    </span>
    {count !== undefined && (
      <span className="ml-auto text-xs font-bold text-silver-600 tabular-nums">
        {count}
      </span>
    )}
    <div className="flex-1 h-px bg-white/5 ml-2" style={count !== undefined ? { flex: 'none', width: 0 } : {}} />
  </div>
)

const ResultCards = ({ result, isGenerating }) => {
  if (!isGenerating && !result) return null

  return (
    <div className="space-y-4 animate-slide-up">

      {/* Header label */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-silver-700 px-2">
          Generated Output
        </span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Meeting meta */}
      {result && !isGenerating && (
        <div className="flex items-center gap-3 px-1">
          <span className="font-display font-bold text-lg text-silver-100">
            {result.title}
          </span>
          <span className="text-xs text-silver-600 bg-white/4 border border-white/6 px-2.5 py-0.5 rounded-full">
            {result.date}
          </span>
          <span className="text-xs text-silver-600 bg-white/4 border border-white/6 px-2.5 py-0.5 rounded-full">
            {result.duration}
          </span>
        </div>
      )}

      {/* Summary Card */}
      <GlassCard className="p-5">
        <SectionHeader icon="📋" label="Summary" />
        {isGenerating ? <Skeleton /> : (
          <p className="text-sm text-silver-300 leading-relaxed">{result.summary}</p>
        )}
      </GlassCard>

      {/* Decisions + Action Items side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Key Decisions */}
        <GlassCard className="p-5">
          <SectionHeader icon="⚡" label="Key Decisions" count={isGenerating ? null : result?.decisions?.length} />
          {isGenerating ? <Skeleton /> : (
            <ul className="space-y-2.5">
              {result.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 group">
                  <div className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(180,190,210,0.07)',
                      border: '1px solid rgba(180,190,210,0.12)',
                    }}
                  >
                    <span className="text-[9px] font-bold text-silver-400">{i + 1}</span>
                  </div>
                  <p className="text-sm text-silver-300 leading-snug">{d}</p>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        {/* Action Items */}
        <GlassCard className="p-5">
          <SectionHeader icon="✅" label="Action Items" count={isGenerating ? null : result?.actionItems?.length} />
          {isGenerating ? <Skeleton /> : (
            <div className="space-y-2">
              {result.actionItems.map((a, i) => (
                <div key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl
                    transition-colors hover:bg-white/[0.03]"
                  style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                      text-[10px] font-bold text-silver-300"
                      style={{
                        background: 'rgba(180,190,210,0.08)',
                        border: '1px solid rgba(180,190,210,0.15)',
                      }}
                    >
                      {a.owner.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-silver-200 truncate">{a.task}</p>
                      <p className="text-[10px] text-silver-600">{a.owner}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-silver-500 flex-shrink-0 ml-2
                    px-2 py-0.5 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {a.due}
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Participants */}
      {result && !isGenerating && (
        <GlassCard className="p-5">
          <SectionHeader icon="👥" label="Participants" />
          <div className="flex flex-wrap gap-2">
            {result.participants.map((p, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center
                  text-[9px] font-bold text-silver-300 flex-shrink-0"
                  style={{
                    background: 'rgba(180,190,210,0.1)',
                    border: '1px solid rgba(180,190,210,0.18)',
                  }}
                >
                  {p.charAt(0)}
                </div>
                <span className="text-xs text-silver-400">{p}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}

export default ResultCards