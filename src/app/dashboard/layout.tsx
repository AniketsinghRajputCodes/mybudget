import Link from 'next/link'
import { signOut } from '../auth/actions'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop top nav */}
      <header className="hidden md:flex items-center justify-between border-b px-6 py-4">
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/add">Add Transaction</Link>
          <Link href="/dashboard/transactions">History</Link>
        </nav>
        <form action={signOut}>
          <button className="text-sm text-gray-600 underline">Sign out</button>
        </form>
      </header>

      <main className="flex-1 pb-20 md:pb-6">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white flex justify-around py-2">
        <Link href="/dashboard" className="flex flex-col items-center text-xs px-3 py-1">
          Home
        </Link>
        <Link href="/dashboard/add" className="flex flex-col items-center text-xs px-3 py-1">
          Add
        </Link>
        <Link
          href="/dashboard/transactions"
          className="flex flex-col items-center text-xs px-3 py-1"
        >
          History
        </Link>
      </nav>
    </div>
  )
}
