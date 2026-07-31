import { updatePassword } from '../actions'

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Set a new password</h1>

        <form action={updatePassword} className="space-y-4">
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

          <button
            type="submit"
            className="w-full rounded-md bg-black text-white py-2 font-medium"
          >
            Update password
          </button>
        </form>
      </div>
    </div>
  )
}
