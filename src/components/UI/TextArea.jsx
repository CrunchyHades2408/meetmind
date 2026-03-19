const TextArea = ({
  label,
  id,
  placeholder = '',
  value,
  onChange,
  rows = 6,
  className = '',
  hint,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="text-xs font-semibold uppercase tracking-widest text-silver-500"
          >
            {label}
          </label>
          {hint && (
            <span className="text-xs text-silver-600">{hint}</span>
          )}
        </div>
      )}

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 text-sm text-silver-100
          bg-white/[0.03] border border-white/7 rounded-xl
          placeholder:text-silver-600
          transition-all duration-200 outline-none resize-none
          focus:border-silver-300/30 focus:bg-white/[0.05]
          focus:shadow-[0_0_0_3px_rgba(180,190,210,0.07)]
          leading-relaxed
        `}
      />

      {value && (
        <p className="text-xs text-silver-600 text-right">
          {value.length} characters
        </p>
      )}
    </div>
  )
}

export default TextArea