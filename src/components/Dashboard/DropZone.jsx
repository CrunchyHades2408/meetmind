import { useState } from 'react'

const DropZone = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setFileName(file.name)
      onFileSelect && onFileSelect(file)
    }
  }

  const handleClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.txt,.pdf,.doc,.docx'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        setFileName(file.name)
        onFileSelect && onFileSelect(file)
      }
    }
    input.click()
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setFileName(null)
    onFileSelect && onFileSelect(null)
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative rounded-2xl p-8 text-center cursor-pointer
        transition-all duration-300 group
        ${isDragging
          ? 'border-2 border-silver-300/40 bg-silver-300/[0.06]'
          : fileName
          ? 'border-2 border-emerald-400/30 bg-emerald-400/[0.04]'
          : 'border-2 border-dashed border-white/8 bg-white/[0.015] hover:border-white/18 hover:bg-white/[0.03]'
        }
      `}
    >
      {/* Glow when dragging */}
      {isDragging && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: 'inset 0 0 40px rgba(180,190,210,0.06)' }}
        />
      )}

      {fileName ? (
        /* File selected state */
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(52,211,153,0.1)',
              border: '1px solid rgba(52,211,153,0.2)',
            }}
          >
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-400">{fileName}</p>
            <p className="text-xs text-silver-600 mt-0.5">File ready to process</p>
          </div>
          <button
            onClick={handleClear}
            className="text-xs text-silver-600 hover:text-red-400 transition-colors
              px-3 py-1 rounded-lg border border-white/6 hover:border-red-400/20
              hover:bg-red-400/5 mt-1"
          >
            Remove file
          </button>
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center gap-3">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            transition-all duration-300
            ${isDragging ? 'scale-110' : 'group-hover:scale-105'}
          `}
            style={{
              background: isDragging
                ? 'rgba(180,190,210,0.12)'
                : 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <svg className={`w-6 h-6 transition-colors duration-300
              ${isDragging ? 'text-silver-200' : 'text-silver-600 group-hover:text-silver-400'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <div>
            <p className={`text-sm font-semibold transition-colors duration-300
              ${isDragging ? 'text-silver-100' : 'text-silver-400'}`}
            >
              {isDragging ? 'Drop your file here' : 'Drop transcript file'}
            </p>
            <p className="text-xs text-silver-600 mt-1">
              or <span className="text-silver-400 underline underline-offset-2">browse</span>
              {' '}· TXT, PDF, DOC, DOCX
            </p>
          </div>

          {/* Format chips */}
          <div className="flex items-center gap-1.5 mt-1">
            {['TXT', 'PDF', 'DOC', 'DOCX'].map((fmt) => (
              <span key={fmt}
                className="text-[10px] font-bold text-silver-700 px-2 py-0.5
                  rounded-md border border-white/5 bg-white/[0.02] tracking-wider"
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropZone