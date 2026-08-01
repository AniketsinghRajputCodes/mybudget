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
          onClick={() => startTransition(async () => { await deleteTransaction(id) })}
          disabled={isPending}
          className="btn-danger px-0 py-0 text-xs underline"
        >
          {isPending ? 'Deleting...' : 'Confirm delete'}
        </button>
        <button onClick={() => setConfirming(false)} className="btn-secondary px-0 py-0 text-xs underline">
          Cancel
        </button>
      </span>
    )
  }

  return (
    <button onClick={() => setConfirming(true)} className="btn-danger px-0 py-0 text-xs underline">
      Delete
    </button>
  )
}
