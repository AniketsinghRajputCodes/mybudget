'use client'

import { useState, useTransition } from 'react'
import { deleteTransaction } from '../actions'

export default function DeleteButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (confirming) {
    return (
      <span className="inline-flex gap-2 text-xs">
        <button
          onClick={() => startTransition(() => deleteTransaction(id))}
          disabled={isPending}
          className="text-red-600 font-medium underline"
        >
          {isPending ? 'Deleting...' : 'Confirm delete'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-gray-500 underline">
          Cancel
        </button>
      </span>
    )
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-xs text-red-600 underline">
      Delete
    </button>
  )
}
