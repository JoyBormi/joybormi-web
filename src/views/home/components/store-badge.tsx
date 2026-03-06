import type { ReactNode } from "react"

type StoreBadgeProps = {
  href: string
  icon: ReactNode
  pre: string
  label: string
  variant?: "primary" | "secondary"
}

function StoreBadge({ href, icon, pre, label, variant = "secondary" }: StoreBadgeProps) {
  return (
    <a href={href} className={`jl-dl-btn ${variant === "primary" ? "jl-dl-btn-primary" : "jl-dl-btn-secondary"}`}>
      {icon}
      <span className="jl-dl-btn-label">
        <span className="jl-dl-btn-sub">{pre}</span>
        <span className="jl-dl-btn-main">{label}</span>
      </span>
    </a>
  )
}

export { StoreBadge }
