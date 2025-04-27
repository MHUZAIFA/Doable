import { ThemeToggle } from "@/components/theme-toggle"
import { FadeIn } from "@/components/animations/fade-in"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <FadeIn direction="up" duration={500}>
      <footer className="border-t">
        <div className="container-fluid flex h-16 items-center justify-between">
          <div className="text-sm text-muted-foreground mx-2">© {currentYear} Doable. All rights reserved.</div>
          <ThemeToggle />
        </div>
      </footer>
    </FadeIn>
  )
}
