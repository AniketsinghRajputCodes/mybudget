'use client'

import { useActionState } from 'react'
import { signUp } from '../actions'
import Link from 'next/link'

const initialState = { error: '' }

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create your account</h1>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name (optional)</label>
            <input
              name="displayName"
              type="text"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full rounded-md border px-3 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">At least 8 characters, 12+ recommended.</p>
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full"
          >
            {pending ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
