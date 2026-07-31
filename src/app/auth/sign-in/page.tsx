'use client'

import { useActionState } from 'react'
import { signIn } from '../actions'
import Link from 'next/link'

const initialState = { error: '' }

export default function SignInPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Sign in</h1>

        <form action={formAction} className="space-y-4">
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
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-black text-white py-2 font-medium disabled:opacity-50"
          >
            {pending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 space-y-1">
          <p>
            <Link href="/auth/forgot-password" className="underline">
              Forgot password?
            </Link>
          </p>
          <p>
            No account?{' '}
            <Link href="/auth/sign-up" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}