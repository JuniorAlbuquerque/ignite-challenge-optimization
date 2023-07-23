import { memo } from "react"

export function Header({ title }: { title: string }) {
  return (
    <header>
      <span className="category">Categoria:<span> {title}</span></span>
    </header>
  )
}