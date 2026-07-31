import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditForm from './EditForm'

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: transaction } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single()

  if (!transaction) {
    notFound()
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Transaction</h1>
      <EditForm transaction={transaction} />
    </div>
  )
}
