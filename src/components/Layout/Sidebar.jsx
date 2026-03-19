import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/history',
    label: 'History',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

const Sidebar = () => {
  const { user, logout, history } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] z-50 flex flex-col"
      style={{
        background: 'rgba(8,11,16,0.97)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(40px)',
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(180,190,210,0.15), rgba(180,190,210,0.05))',
              border: '1px solid rgba(180,190,210,0.2)',
              boxShadow: '0 0 12px rgba(180,190,210,0.08)',
            }}
          >
            <svg className="w-4 h-4 text-silver-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-silver-100 leading-none">MeetMind</p>
            <p className="text-[10px] text-silver-600 mt-0.5 leading-none">AI Minutes Generator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-silver-700 px-3 mb-3">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-2.5 px-3 py-2.5 rounded-xl
              text-sm font-medium transition-all duration-200
              border group
              ${isActive
                ? 'bg-white/[0.07] text-silver-100 border-white/10 shadow-[0_0_20px_rgba(180,190,210,0.05)]'
                : 'text-silver-500 border-transparent hover:bg-white/[0.04] hover:text-silver-200 hover:border-white/6'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <span className={`transition-colors ${isActive ? 'text-silver-200' : 'text-silver-600 group-hover:text-silver-400'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-silver-300"
                    style={{ boxShadow: '0 0 6px rgba(180,190,210,0.7)' }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Stats strip */}
      <div className="mx-3 mb-3 p-3 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-silver-700 mb-2">
          This Month
        </p>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display font-bold text-2xl text-silver-100 leading-none">
              {history.length}
            </p>
            <p className="text-[11px] text-silver-600 mt-0.5">meetings processed</p>
          </div>
          <div className="flex gap-0.5 items-end h-6">
            {[3, 5, 2, 7, 4, 6, 5].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-sm"
                style={{
                  height: `${(h / 7) * 100}%`,
                  background: i === 6
                    ? 'rgba(180,190,210,0.5)'
                    : 'rgba(180,190,210,0.12)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* User + Logout */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl group">
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-silver-200"
            style={{
              background: 'linear-gradient(135deg, rgba(180,190,210,0.18), rgba(180,190,210,0.06))',
              border: '1px solid rgba(180,190,210,0.2)',
            }}
          >
            {user?.avatar || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-silver-200 truncate leading-none">{user?.name}</p>
            <p className="text-[10px] text-silver-600 truncate mt-0.5">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-silver-700 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-400/10"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar