'use client'

import { useActionState } from 'react'
import { updatePassword } from '../actions'

const initialState = { error: '' }

export default function ResetPasswordPage() {
  const [state, formAction, pending] = useActionState(updatePassword, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Set a new password</h1>
 <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">New password</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full"
          >
            {pending ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}
