import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

type SearchParams = {
  q?: string
  type?: string
  category?: string
  from?: string
  to?: string
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('transactions')
    .select('*')
    .order('transaction_date', { ascending: false })
    .order('created_at', { ascending: false })

  if (params.q) {
    query = query.or(`description.ilike.%${params.q}%,category.ilike.%${params.q}%`)
  }
  if (params.type) {
    query = query.eq('type', params.type)
  }
  if (params.category) {
    query = query.eq('category', params.category)
  }
  if (params.from) {
    query = query.gte('transaction_date', params.from)
  }
  if (params.to) {
    query = query.lte('transaction_date', params.to)
  }

  const { data: transactions, error } = await query.limit(200)

  return (
    <div className="page">
      <h1 className="text-2xl font-semibold mb-6">Transaction History</h1>

      <form className="grid grid-cols-2 gap-3 mb-6 text-sm">
        <input
          name="q"
          defaultValue={params.q}
          placeholder="Search description/category"
          className="col-span-2 rounded-md border px-3 py-2"
        />
        <select name="type" defaultValue={params.type ?? ''} className="rounded-md border px-3 py-2">
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          name="category"
          defaultValue={params.category}
          placeholder="Category"
          className="rounded-md border px-3 py-2"
        />
        <input name="from" type="date" defaultValue={params.from} className="rounded-md border px-3 py-2" />
        <input name="to" type="date" defaultValue={params.to} className="rounded-md border px-3 py-2" />
        <button className="btn-primary col-span-2 w-full">Apply filters</button>
      </form>

      {error && <p className="text-red-600 text-sm">{error.message}</p>}

      {!error && transactions?.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-12">
          No transactions yet.{' '}
          <Link href="/dashboard/add" className="underline">
            Add your first one
          </Link>
          .
        </p>
      )}

      <ul className="divide-y">
        {transactions?.map((t) => (
          <li key={t.id} className="py-3 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {t.category}{' '}
                <span className="text-xs text-gray-400 font-normal">{t.transaction_date}</span>
              </p>
              {t.description && <p className="text-sm text-gray-500">{t.description}</p>}
              {t.payment_method && (
                <p className="text-xs text-gray-400">{t.payment_method}</p>
              )}
            </div>
            <div className="text-right space-y-1">
              <p className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toFixed(2)}
              </p>
              <div className="flex gap-2 justify-end">
                <Link
                  href={`/dashboard/transactions/${t.id}/edit`}
                  className="text-xs text-gray-600 underline"
                >
                  Edit
                </Link>
                <DeleteButton id={t.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
