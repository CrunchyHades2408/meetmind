const variants = {
  primary: `
    bg-gradient-to-br from-silver-300/10 to-silver-300/5
    border border-silver-300/25 text-silver-100
    hover:from-silver-300/18 hover:to-silver-300/10
    hover:border-silver-300/45
    hover:shadow-[0_0_20px_rgba(180,190,210,0.10),0_4px_16px_rgba(0,0,0,0.3)]
    hover:-translate-y-px active:translate-y-0
  `,
  ghost: `
    bg-transparent border border-white/7
    text-silver-400
    hover:bg-white/4 hover:border-white/13 hover:text-silver-100
  `,
  danger: `
    bg-red-500/10 border border-red-500/20 text-red-400
    hover:bg-red-500/18 hover:border-red-500/35
  `,
  success: `
    bg-emerald-500/10 border border-emerald-500/20 text-emerald-400
    hover:bg-emerald-500/18 hover:border-emerald-500/35
  `,
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-sm gap-2.5',
  xl: 'px-8 py-3.5 text-base gap-3',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-semibold font-body
        rounded-xl transition-all duration-200 outline-none
        tracking-wide select-none
        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin w-4 h-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button