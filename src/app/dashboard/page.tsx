import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  ShoppingBag,
  Banknote,
  Car,
  UtensilsCrossed,
  Zap,
  Repeat,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react'
import CategoryChart from './CategoryChart'
import TrendChart from './TrendChart'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Food: UtensilsCrossed,
  Groceries: ShoppingBag,
  Transport: Car,
  Utilities: Zap,
  Shopping: ShoppingBag,
  Entertainment: Repeat,
  Salary: Banknote,
  Freelance: Banknote,
}

function iconFor(category: string) {
  return CATEGORY_ICONS[category] ?? (category ? ShoppingBag : ShoppingBag)
}

export default async function DashboardHome() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .order('transaction_date', { ascending: false })
    .order('created_at', { ascending: false })

  const rows = transactions ?? []

  const now = new Date()
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const totalBalance = rows.reduce(
    (sum, t) => sum + (t.type === 'income' ? Number(t.amount) : -Number(t.amount)),
    0
  )

  const thisMonth = rows.filter((t) => t.transaction_date.startsWith(currentMonthKey))
  const monthlyIncome = thisMonth
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + Number(t.amount), 0)
  const monthlyExpense = thisMonth
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + Number(t.amount), 0)
  const monthlySavings = monthlyIncome - monthlyExpense

  // Category breakdown (this month's expenses)
  const categoryTotals: Record<string, number> = {}
  thisMonth
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] ?? 0) + Number(t.amount)
    })
  const categoryData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))

  // Last 6 months trend
  const monthlyPoints: { month: string; income: number; expense: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('en-US', { month: 'short' })
    const monthRows = rows.filter((t) => t.transaction_date.startsWith(key))
    monthlyPoints.push({
      month: label,
      income: monthRows.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0),
      expense: monthRows.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0),
    })
  }

  const recent = rows.slice(0, 5)

  return (
    <div className="max-w-3xl mx-auto px-5 pt-6 space-y-10">
      <div>
        <h1 className="text-xl font-semibold">Welcome back</h1>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Balance</p>
          <p className="text-2xl font-bold">₹{totalBalance.toFixed(0)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Income (mo.)</p>
          <p className="text-2xl font-bold text-income">+₹{monthlyIncome.toFixed(0)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Expense (mo.)</p>
          <p className="text-2xl font-bold text-expense">-₹{monthlyExpense.toFixed(0)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Savings (mo.)</p>
          <p className="text-2xl font-bold text-primary">₹{monthlySavings.toFixed(0)}</p>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Spending by category</h2>
          <CategoryChart data={categoryData} />
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Monthly trend</h2>
          <TrendChart data={monthlyPoints} />
        </div>
      </section>

      {/* Recent activity */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Recent activity</h2>
          <Link href="/dashboard/transactions" className="text-sm text-primary font-medium">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-sm text-muted text-center py-10">
            No transactions yet.{' '}
            <Link href="/dashboard/add" className="text-primary underline">
              Add your first one
            </Link>
            .
          </p>
        ) : (
          <div className="space-y-3">
            {recent.map((t) => {
              const Icon = iconFor(t.category)
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 bg-surface border border-border rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-surface-alt flex items-center justify-center text-primary">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{t.category}</p>
                      <p className="text-xs text-muted">{t.transaction_date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-sm">
                    {t.type === 'income' ? (
                      <ArrowDownLeft size={14} className="text-income" />
                    ) : (
                      <ArrowUpRight size={14} className="text-expense" />
                    )}
                    <span className={t.type === 'income' ? 'text-income' : 'text-expense'}>
                      ₹{Number(t.amount).toFixed(0)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}