import { requestPasswordReset } from '../actions'

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Reset your password</h1>
        <p className="text-sm text-gray-600 text-center">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form action={requestPasswordReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black text-white py-2 font-medium"
          >
            Send reset link
          </button>
        </form>
      </div>
    </div>
  )
}
