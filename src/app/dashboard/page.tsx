import { createClient } from '@/lib/supabase/server'
import { signOut } from '../auth/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="max-w-md mx-auto mt-20 px-4 space-y-4 text-center">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-gray-600">Signed in as {user?.email}</p>
      <form action={signOut}>
        <button className="rounded-md bg-black text-white px-4 py-2 font-medium">
          Sign out
        </button>
      </form>
    </div>
  )
}
