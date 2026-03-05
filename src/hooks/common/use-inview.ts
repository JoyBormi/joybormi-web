import { useEffect, useState } from "react"

export const useInView = (ref: React.RefObject<Element | null>) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const { top } = ref.current.getBoundingClientRect()
      if (top < 500) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ref])

  return scrolled
}
