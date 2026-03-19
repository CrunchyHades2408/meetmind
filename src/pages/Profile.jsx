import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'

const STATS = [
  { label: 'Total Meetings', value: '47', icon: '📋' },
  { label: 'This Month', value: '8', icon: '📅' },
  { label: 'Action Items', value: '132', icon: '✅' },
  { label: 'Hours Saved', value: '23', icon: '⚡' },
]

const ACTIVITY = [
  { day: 'Mon', count: 3 },
  { day: 'Tue', count: 1 },
  { day: 'Wed', count: 4 },
  { day: 'Thu', count: 2 },
  { day: 'Fri', count: 5 },
  { day: 'Sat', count: 0 },
  { day: 'Sun', count: 1 },
]

const Profile = () => {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">

      {/* Page Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-silver-600 mb-1">
          Profile
        </p>
        <h1 className="font-display font-bold text-3xl text-silver-100 leading-tight">
          Account
        </h1>
        <p className="text-sm text-silver-500 mt-1">
          Manage your profile and preferences
        </p>
      </div>

      {/* User Card */}
      <GlassCard bright className="p-6 glow-silver">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center
                font-display font-bold text-2xl text-silver-100"
              style={{
                background: 'linear-gradient(135deg, rgba(180,190,210,0.15), rgba(180,190,210,0.05))',
                border: '1px solid rgba(180,190,210,0.22)',
                boxShadow: '0 0 32px rgba(180,190,210,0.08)',
              }}
            >
              {user.avatar}
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full
                flex items-center justify-center"
              style={{
                background: 'rgba(52,211,153,0.15)',
                border: '1px solid rgba(52,211,153,0.3)',
                boxShadow: '0 0 8px rgba(52,211,153,0.3)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-xl text-silver-100">
              {user.name}
            </h2>
            <p className="text-sm text-silver-400 mt-0.5">{user.role}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-silver-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user.email}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-silver-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {user.joinedDate}
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide"
                style={{
                  background: 'rgba(52,211,153,0.1)',
                  border: '1px solid rgba(52,211,153,0.2)',
                  color: '#34d399',
                }}
              >
                PRO PLAN
              </span>
            </div>
          </div>

          {/* Logout — desktop */}
          <div className="hidden sm:block flex-shrink-0">
            <Button variant="danger" onClick={handleLogout}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((stat) => (
          <GlassCard key={stat.label} hover className="p-4">
            <div className="flex flex-col gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span className="text-base">{stat.icon}</span>
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-silver-100 leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-silver-600 mt-1">{stat.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Weekly Activity */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-silver-600 mb-0.5">
              This Week
            </p>
            <h3 className="font-display font-bold text-lg text-silver-100">
              Meeting Activity
            </h3>
          </div>
          <span className="text-xs text-silver-600">
            {ACTIVITY.reduce((a, b) => a + b.count, 0)} total
          </span>
        </div>

        <div className="flex items-end justify-between gap-2 h-20">
          {ACTIVITY.map((item, i) => {
            const max = Math.max(...ACTIVITY.map((a) => a.count))
            const pct = max > 0 ? (item.count / max) * 100 : 0
            return (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex items-end justify-center" style={{ height: '64px' }}>
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: item.count === 0 ? '4px' : `${pct}%`,
                      background: item.count === 0
                        ? 'rgba(255,255,255,0.04)'
                        : i === 4
                        ? 'linear-gradient(to top, rgba(180,190,210,0.5), rgba(180,190,210,0.2))'
                        : 'linear-gradient(to top, rgba(180,190,210,0.2), rgba(180,190,210,0.08))',
                      border: item.count === 0
                        ? '1px solid rgba(255,255,255,0.05)'
                        : '1px solid rgba(180,190,210,0.15)',
                    }}
                  />
                </div>
                <span className="text-[10px] text-silver-700 font-semibold">{item.day}</span>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Preferences Card */}
      <GlassCard className="p-6">
        <h3 className="font-display font-bold text-lg text-silver-100 mb-4">
          Preferences
        </h3>
        <div className="space-y-1">
          {[
            { label: 'Email notifications for new minutes', enabled: true },
            { label: 'Auto-save generated minutes to history', enabled: true },
            { label: 'Show participant avatars in output', enabled: false },
            { label: 'Include timestamps in summary', enabled: false },
          ].map((pref, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-white/4 last:border-0"
            >
              <p className="text-sm text-silver-300">{pref.label}</p>
              <ToggleSwitch defaultOn={pref.enabled} />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Logout — mobile */}
      <div className="sm:hidden">
        <Button variant="danger" className="w-full" onClick={handleLogout}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </Button>
      </div>

    </div>
  )
}

/* ── Toggle Switch ── */
const ToggleSwitch = ({ defaultOn }) => {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`
        relative w-9 h-5 rounded-full transition-all duration-300 flex-shrink-0
        border
        ${on
          ? 'border-silver-300/25'
          : 'border-white/8'
        }
      `}
      style={{
        background: on
          ? 'rgba(180,190,210,0.18)'
          : 'rgba(255,255,255,0.04)',
        boxShadow: on ? '0 0 10px rgba(180,190,210,0.1)' : 'none',
      }}
    >
      <div
        className={`
          absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300
          ${on ? 'translate-x-4 bg-silver-200' : 'translate-x-0.5 bg-silver-600'}
        `}
      />
    </button>
  )
}

export default Profile