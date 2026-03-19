import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import GlassCard from '../components/UI/GlassCard'
import Badge from '../components/UI/Badge'
import Input from '../components/UI/Input'

const FILTERS = ['All', 'Product', 'Engineering', 'Marketing', 'Customer Success', 'Company']

const History = () => {
  const { history, openModal } = useApp()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = useMemo(() => {
    return history.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.preview.toLowerCase().includes(search.toLowerCase()) ||
        m.participants.some((p) =>
          p.toLowerCase().includes(search.toLowerCase())
        )
      const matchesFilter =
        activeFilter === 'All' || m.tag === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [history, search, activeFilter])

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">

      {/* Page Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-silver-600 mb-1">
          History
        </p>
        <h1 className="font-display font-bold text-3xl text-silver-100 leading-tight">
          Meeting Archive
        </h1>
        <p className="text-sm text-silver-500 mt-1">
          {history.length} meetings processed · click any row to expand
        </p>
      </div>

      {/* Search + Filter Bar */}
      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <Input
              id="search"
              placeholder="Search by title, content, or participant…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`
                  px-3 py-2 rounded-lg text-xs font-semibold
                  transition-all duration-200 border
                  ${activeFilter === f
                    ? 'bg-white/[0.08] text-silver-100 border-white/12 shadow-[0_0_12px_rgba(180,190,210,0.06)]'
                    : 'bg-transparent text-silver-500 border-transparent hover:text-silver-300 hover:bg-white/[0.04]'
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {(search || activeFilter !== 'All') && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <p className="text-xs text-silver-600">
              Showing <span className="text-silver-300 font-semibold">{filtered.length}</span> of{' '}
              <span className="text-silver-300 font-semibold">{history.length}</span> meetings
            </p>
            <button
              onClick={() => { setSearch(''); setActiveFilter('All') }}
              className="text-xs text-silver-600 hover:text-silver-300 transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          </div>
        )}
      </GlassCard>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_120px_90px_100px_44px] gap-4 px-5">
        {['Meeting', 'Date', 'Duration', 'Tag', ''].map((h, i) => (
          <p key={i} className="text-[10px] font-bold uppercase tracking-widest text-silver-700">
            {h}
          </p>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <GlassCard className="p-12 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <svg className="w-5 h-5 text-silver-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-silver-500 font-semibold">No meetings found</p>
            <p className="text-xs text-silver-700">Try adjusting your search or filters</p>
          </GlassCard>
        ) : (
          filtered.map((meeting) => (
            <MeetingRow
              key={meeting.id}
              meeting={meeting}
              isExpanded={expandedId === meeting.id}
              onToggle={() => toggleExpand(meeting.id)}
              onOpenModal={() => openModal(meeting)}
            />
          ))
        )}
      </div>
    </div>
  )
}

/* ── Meeting Row ── */
const MeetingRow = ({ meeting, isExpanded, onToggle, onOpenModal }) => {
  const m = meeting

  return (
    <div
      className={`
        rounded-2xl overflow-hidden transition-all duration-300
        ${isExpanded ? 'glow-active' : ''}
      `}
      style={{
        background: isExpanded
          ? 'rgba(255,255,255,0.045)'
          : 'rgba(255,255,255,0.025)',
        border: isExpanded
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Main row */}
      <div
        onClick={onToggle}
        className="grid grid-cols-1 md:grid-cols-[1fr_120px_90px_100px_44px]
          gap-3 md:gap-4 items-center px-5 py-4 cursor-pointer
          hover:bg-white/[0.02] transition-colors"
      >
        {/* Title + Preview */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm text-silver-100 truncate">
              {m.title}
            </p>
          </div>
          <p className="text-xs text-silver-600 mt-0.5 line-clamp-1 leading-relaxed">
            {m.preview}
          </p>
          {/* Mobile-only meta */}
          <div className="flex items-center gap-2 mt-1.5 md:hidden">
            <Badge label={m.tag} />
            <span className="text-xs text-silver-700">{m.date}</span>
            <span className="text-xs text-silver-700">{m.duration}</span>
          </div>
        </div>

        {/* Date — desktop */}
        <p className="hidden md:block text-xs text-silver-500 tabular-nums">
          {m.date}
        </p>

        {/* Duration — desktop */}
        <p className="hidden md:block text-xs text-silver-500">
          {m.duration}
        </p>

        {/* Tag — desktop */}
        <div className="hidden md:flex">
          <Badge label={m.tag} />
        </div>

        {/* Chevron */}
        <div className="flex items-center justify-end md:justify-center">
          <div className={`
            w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
            transition-all duration-300
            ${isExpanded
              ? 'bg-white/[0.08] text-silver-200 rotate-180'
              : 'bg-white/[0.03] text-silver-600'
            }
          `}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-white/5 animate-slide-up">
          <div className="pt-4 space-y-4">

            {/* Participants */}
            <div className="flex flex-wrap gap-1.5">
              {m.participants.map((p, i) => (
                <span key={i}
                  className="text-xs px-2.5 py-1 rounded-full text-silver-400"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Summary */}
            <p className="text-sm text-silver-400 leading-relaxed">
              {m.summary}
            </p>

            {/* Decisions + Actions two-col */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Decisions */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-silver-700">
                  Key Decisions
                </p>
                <ul className="space-y-1.5">
                  {m.decisions.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-silver-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-silver-600 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-silver-700">
                  Action Items
                </p>
                <div className="space-y-1.5">
                  {m.actionItems.map((a, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center
                          text-[8px] font-bold text-silver-400 flex-shrink-0"
                          style={{ background: 'rgba(180,190,210,0.08)', border: '1px solid rgba(180,190,210,0.12)' }}
                        >
                          {a.owner.charAt(0)}
                        </div>
                        <p className="text-xs text-silver-400 truncate">{a.task}</p>
                      </div>
                      <span className="text-[10px] text-silver-700 flex-shrink-0">{a.due}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Open full modal CTA */}
            <div className="flex justify-end pt-1">
              <button
                onClick={(e) => { e.stopPropagation(); onOpenModal() }}
                className="flex items-center gap-1.5 text-xs font-semibold text-silver-400
                  hover:text-silver-100 transition-colors px-3 py-1.5 rounded-lg
                  hover:bg-white/[0.05] border border-transparent hover:border-white/8"
              >
                View full details
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default History