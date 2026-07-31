'use client'

import { useActionState, useState, useEffect } from 'react'
import { addTransaction } from '../actions'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from '@/lib/categories'

const initialState = { error: '', success: false }

function today() {
  return new Date().toISOString().split('T')[0]
}

export default function AddTransactionPage() {
  const [state, formAction, pending] = useActionState(addTransaction, initialState)
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [useCustomCategory, setUseCustomCategory] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

  // Reset the form fields after a successful "Save & add another"
  useEffect(() => {
    if (state.success) {
      setFormKey((k) => k + 1)
    }
  }, [state.success])

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Add Transaction</h1>

      <form key={formKey} action={formAction} className="space-y-4">
        {/* Type toggle */}
        <div className="flex rounded-md overflow-hidden border">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 text-sm font-medium ${
              type === 'expense' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 text-sm font-medium ${
              type === 'income' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Income
          </button>
        </div>
        <input type="hidden" name="type" value={type} />

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            name="amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0.01"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            name="transaction_date"
            type="date"
            defaultValue={today()}
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          {!useCustomCategory ? (
            <select name="category" required className="w-full rounded-md border px-3 py-2">
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : (
            <input
              name="category"
              type="text"
              required
              placeholder="Type a custom category"
              className="w-full rounded-md border px-3 py-2"
            />
          )}
          <button
            type="button"
            onClick={() => setUseCustomCategory(!useCustomCategory)}
            className="text-xs text-gray-500 underline mt-1"
          >
            {useCustomCategory ? 'Choose from list instead' : '+ Add custom category'}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (optional)</label>
          <input name="description" type="text" className="w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment method (optional)</label>
          <select name="payment_method" className="w-full rounded-md border px-3 py-2">
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
        {state?.success && (
          <p className="text-sm text-green-700 bg-green-50 rounded-md px-3 py-2">
            Saved! Add another below.
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            name="intent"
            value="save"
            disabled={pending}
            className="flex-1 rounded-md bg-black text-white py-2 font-medium disabled:opacity-50"
          >
            {pending ? 'Saving...' : 'Save'}
          </button>
          <button
            type="submit"
            name="intent"
            value="add-another"
            disabled={pending}
            className="flex-1 rounded-md border py-2 font-medium disabled:opacity-50"
          >
            Save & add another
          </button>
        </div>
      </form>
    </div>
  )
}
