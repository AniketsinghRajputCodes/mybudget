'use client'

import { useActionState } from 'react'
import { updateTransaction } from '../../../actions'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from '@/lib/categories'

const initialState = { error: '' }

type Transaction = {
  id: string
  type: string
  amount: number
  transaction_date: string
  category: string
  description: string | null
  payment_method: string | null
}

export default function EditForm({ transaction }: { transaction: Transaction }) {
  const updateWithId = updateTransaction.bind(null, transaction.id)
  const [state, formAction, pending] = useActionState(updateWithId, initialState)

  const categories = transaction.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select name="type" defaultValue={transaction.type} className="w-full rounded-md border px-3 py-2">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={transaction.amount}
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          name="transaction_date"
          type="date"
          defaultValue={transaction.transaction_date}
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          name="category"
          type="text"
          list="category-options"
          defaultValue={transaction.category}
          required
          className="w-full rounded-md border px-3 py-2"
        />
        <datalist id="category-options">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description (optional)</label>
        <input
          name="description"
          type="text"
          defaultValue={transaction.description ?? ''}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Payment method (optional)</label>
        <select
          name="payment_method"
          defaultValue={transaction.payment_method ?? ''}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select...</option>
          {PAYMENT_METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full"
      >
        {pending ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  )
}
