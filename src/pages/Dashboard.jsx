import { useState } from 'react'
import { useApp } from '../context/AppContext'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import TextArea from '../components/UI/TextArea'
import DropZone from '../components/Dashboard/DropZone'
import MicButton from '../components/Dashboard/MicButton'
import ResultCards from '../components/Dashboard/ResultCards'
import { MOCK_TRANSCRIPT } from '../data/mockData'

const TAB_FILE = 'file'
const TAB_TEXT = 'text'

const Dashboard = () => {
  const { user, generateMinutes, isGenerating, generatedResult } = useApp()
  const [activeTab, setActiveTab] = useState(TAB_TEXT)
  const [transcript, setTranscript] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const canGenerate = activeTab === TAB_TEXT
    ? transcript.trim().length > 10
    : selectedFile !== null

  const handleGenerate = () => {
    if (!canGenerate || isGenerating) return
    generateMinutes(activeTab === TAB_TEXT ? transcript : selectedFile?.name)
  }

  const handleUseSample = () => {
    setActiveTab(TAB_TEXT)
    setTranscript(MOCK_TRANSCRIPT)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-silver-600 mb-1">
            Dashboard
          </p>
          <h1 className="font-display font-bold text-3xl text-silver-100 leading-tight">
            Generate Minutes
          </h1>
          <p className="text-sm text-silver-500 mt-1">
            Good to see you, <span className="text-silver-300">{user?.name?.split(' ')[0]}</span>.
            Drop a transcript or paste text below.
          </p>
        </div>

        {/* Mic button — top right */}
        <div className="flex-shrink-0">
          <MicButton />
        </div>
      </div>

      {/* Input Card */}
      <GlassCard bright className="p-6 glow-silver">

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl mb-6 w-fit"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            {
              key: TAB_TEXT,
              label: 'Paste Text',
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
            },
            {
              key: TAB_FILE,
              label: 'Upload File',
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              ),
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-lg
                text-xs font-semibold transition-all duration-200
                ${activeTab === tab.key
                  ? 'bg-white/[0.07] text-silver-100 shadow-sm border border-white/8'
                  : 'text-silver-500 hover:text-silver-300'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Input area */}
        {activeTab === TAB_TEXT ? (
          <div className="space-y-3">
            <TextArea
              id="transcript"
              label="Meeting Transcript"
              placeholder="Paste your meeting transcript here…&#10;&#10;e.g. [00:00] Sarah: Let's get started with our weekly sync.&#10;[00:15] Mike: I have updates on the backend migration..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={10}
              hint={transcript ? `~${Math.ceil(transcript.split(' ').length / 130)} min read` : ''}
            />
            {!transcript && (
              <button
                onClick={handleUseSample}
                className="text-xs text-silver-500 hover:text-silver-300 transition-colors
                  flex items-center gap-1.5 group"
              >
                <svg className="w-3 h-3 group-hover:scale-110 transition-transform"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Use sample transcript
              </button>
            )}
          </div>
        ) : (
          <DropZone onFileSelect={setSelectedFile} />
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/5">
          <div className="flex items-center gap-4">
            {/* AI model badge */}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }}
              />
              <span className="text-xs text-silver-600">MeetMind AI · v2.1</span>
            </div>

            {/* Word count */}
            {activeTab === TAB_TEXT && transcript && (
              <span className="text-xs text-silver-700 tabular-nums">
                {transcript.split(/\s+/).filter(Boolean).length} words
              </span>
            )}
          </div>

          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={!canGenerate}
            loading={isGenerating}
            className="min-w-[160px]"
          >
            {!isGenerating && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
            {isGenerating ? '' : 'Generate Minutes'}
          </Button>
        </div>
      </GlassCard>

      {/* Loading skeleton message */}
      {isGenerating && (
        <GlassCard className="p-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(180,190,210,0.07)',
                border: '1px solid rgba(180,190,210,0.12)',
              }}
            >
              <svg className="w-4 h-4 text-silver-300 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-silver-200">Analyzing transcript…</p>
              <p className="text-xs text-silver-600 mt-0.5">
                Extracting decisions, action items, and summary
              </p>
            </div>
            <div className="ml-auto flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i}
                  className="w-1.5 h-1.5 rounded-full bg-silver-500 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </GlassCard>
      )}

      {/* Results */}
      <ResultCards result={generatedResult} isGenerating={isGenerating} />

    </div>
  )
}

export default Dashboard