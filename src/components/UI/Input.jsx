const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  icon,
  className = '',
  autoComplete,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-widest text-silver-500"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`
            w-full py-2.5 text-sm text-silver-100
            bg-white/[0.03] border border-white/7 rounded-xl
            placeholder:text-silver-600
            transition-all duration-200 outline-none
            focus:border-silver-300/30 focus:bg-white/[0.05]
            focus:shadow-[0_0_0_3px_rgba(180,190,210,0.07)]
            ${icon ? 'pl-10 pr-4' : 'px-4'}
            ${error ? 'border-red-400/40 focus:border-red-400/50' : ''}
          `}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 mt-0.5 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default Input