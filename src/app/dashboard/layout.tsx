import Link from 'next/link'
import { LayoutDashboard, PlusCircle, History } from 'lucide-react'
import { signOut } from '../auth/actions'
import ThemeToggle from '@/components/theme-toggle'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Desktop top nav */}
      <header className="hidden md:flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="font-bold text-lg text-primary">MyBudget</span>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/dashboard" className="nav-link">
              Home
            </Link>
            <Link href="/dashboard/add" className="nav-link">
              Add Transaction
            </Link>
            <Link href="/dashboard/transactions" className="nav-link">
              History
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <form action={signOut}>
            <button className="text-sm text-foreground underline transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </header>

      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-5 h-14 sticky top-0 bg-background/80 backdrop-blur-md z-40">
        <span className="font-bold text-lg text-primary">MyBudget</span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <form action={signOut}>
            <button className="text-xs text-foreground underline px-2">Sign out</button>
          </form>
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-6">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-surface flex justify-around items-center py-2 z-50">
        <Link
          href="/dashboard"
          className="nav-link flex flex-col items-center gap-0.5 px-4 py-1"
        >
          <LayoutDashboard size={22} />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link
          href="/dashboard/add"
          className="flex flex-col items-center gap-0.5 text-primary px-4 py-1"
        >
          <PlusCircle size={26} />
          <span className="text-xs font-medium">Add</span>
        </Link>
        <Link
          href="/dashboard/transactions"
          className="nav-link flex flex-col items-center gap-0.5 px-4 py-1"
        >
          <History size={22} />
          <span className="text-xs font-medium">History</span>
        </Link>
      </nav>
    </div>
  )
}