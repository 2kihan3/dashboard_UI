export default function TimeWindowSwitch<T extends number>({ value, options, label, onChange }: { value: T; options: Array<{ value: T; label: string }>; label: string; onChange: (value: T) => void }) {
  return <div className="os-time-switch" role="group" aria-label={label}>{options.map(option => <button type="button" key={option.value} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>{option.label}</button>)}</div>
}
