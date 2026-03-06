type StatsItem = {
  value: string
  suffix: string
  label: string
}

function StatsStrip({ items }: { items: StatsItem[] }) {
  return (
    <div className="jl-stats-bar">
      <div className="jl-stats-inner">
        {items.map((item) => (
          <article key={item.label} className="jl-stat-item">
            <p className="jl-stat-value">
              {item.value}
              <span>{item.suffix}</span>
            </p>
            <p className="jl-stat-label">{item.label}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export { StatsStrip }
