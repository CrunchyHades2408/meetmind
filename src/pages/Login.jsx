import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import GlassCard from '../components/UI/GlassCard'

const Login = () => {
  const { login, user } = useApp()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (user) {
    navigate('/dashboard', { replace: true })
    return null
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Invalid credentials. Try any email + password (4+ chars).')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-void">

      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 20% 20%, rgba(100,140,220,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(180,190,210,0.04) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(180,190,210,0.025) 0%, transparent 70%)
          `,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #b4bec8, transparent)', filter: 'blur(60px)' }}
      />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.025]"
        style={{ background: 'radial-gradient(circle, #648cdc, transparent)', filter: 'blur(80px)' }}
      />

      {/* Card */}
      <div className="relative w-full max-w-sm px-4 animate-slide-up">
        <GlassCard bright className="p-8 glow-silver">

          {/* Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(180,190,210,0.15), rgba(180,190,210,0.04))',
                border: '1px solid rgba(180,190,210,0.22)',
                boxShadow: '0 0 24px rgba(180,190,210,0.1)',
              }}
            >
              <svg className="w-6 h-6 text-silver-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="font-display font-bold text-2xl text-silver-100 text-glow">MeetMind</h1>
            <p className="text-sm text-silver-500 mt-1">AI-powered meeting intelligence</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-xs text-silver-700 font-semibold uppercase tracking-widest">Sign In</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="you@company.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 rounded-xl text-xs text-red-400 flex items-start gap-2"
              style={{ background: 'rgba(220,80,80,0.08)', border: '1px solid rgba(220,80,80,0.15)' }}
            >
              <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            className="w-full mt-6"
            size="lg"
            loading={loading}
            onClick={handleLogin}
          >
            {!loading && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            )}
            {loading ? '' : 'Sign In'}
          </Button>

          {/* Hint */}
          <p className="text-center text-xs text-silver-700 mt-5">
            Use any email + any password (4+ chars) to sign in
          </p>
        </GlassCard>
      </div>
    </div>
  )
}

export default Login