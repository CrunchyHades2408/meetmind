import { useState } from 'react'

const MicButton = () => {
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const toggle = () => {
    if (!recording) {
      setRecording(true)
      setSeconds(0)
      const interval = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
      // store so we can clear
      window._micInterval = interval
    } else {
      setRecording(false)
      clearInterval(window._micInterval)
      setSeconds(0)
    }
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className="flex flex-col items-center gap-3">

      {/* Outer rings when recording */}
      <div className="relative flex items-center justify-center">
        {recording && (
          <>
            <div className="absolute w-20 h-20 rounded-full animate-ping opacity-10"
              style={{ background: 'rgba(239,68,68,0.4)' }}
            />
            <div className="absolute w-24 h-24 rounded-full animate-ping opacity-[0.06]"
              style={{ background: 'rgba(239,68,68,0.3)', animationDelay: '0.3s' }}
            />
          </>
        )}

        {/* Main button */}
        <button
          onClick={toggle}
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-300 outline-none
            ${recording
              ? 'scale-105 hover:scale-110'
              : 'hover:scale-105'
            }
          `}
          style={recording ? {
            background: 'linear-gradient(135deg, rgba(239,68,68,0.22), rgba(239,68,68,0.1))',
            border: '1px solid rgba(239,68,68,0.4)',
            boxShadow: '0 0 0 0 rgba(239,68,68,0.4), 0 0 24px rgba(239,68,68,0.15)',
            animation: 'pulse-ring 1.5s ease-out infinite',
          } : {
            background: 'linear-gradient(135deg, rgba(180,190,210,0.12), rgba(180,190,210,0.05))',
            border: '1px solid rgba(180,190,210,0.2)',
            boxShadow: '0 0 20px rgba(180,190,210,0.06)',
          }}
        >
          {recording ? (
            /* Stop icon */
            <div className="w-5 h-5 rounded-sm bg-red-400" />
          ) : (
            /* Mic icon */
            <svg className="w-6 h-6 text-silver-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
      </div>

      {/* Label + Timer */}
      <div className="text-center">
        {recording ? (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-semibold text-red-400 tracking-wide">RECORDING</span>
            </div>
            <span className="font-display text-lg font-bold text-silver-100 tabular-nums">
              {formatTime(seconds)}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-xs font-semibold text-silver-500">Live Record</p>
            <p className="text-[10px] text-silver-700">Click to start</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MicButton