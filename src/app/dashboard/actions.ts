'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type ActionState = { error: string; success?: boolean }

export async function addTransaction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be signed in.' }
  }

  const type = formData.get('type') as string
  const amount = parseFloat(formData.get('amount') as string)
  const transaction_date = formData.get('transaction_date') as string
  const category = (formData.get('category') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const payment_method = (formData.get('payment_method') as string) || null

  if (!type || !['income', 'expense'].includes(type)) {
    return { error: 'Please choose a valid type.' }
  }
  if (!amount || amount <= 0) {
    return { error: 'Amount must be greater than 0.' }
  }
  if (!transaction_date) {
    return { error: 'Please choose a date.' }
  }
  if (!category) {
    return { error: 'Please choose or enter a category.' }
  }

  const { error } = await supabase.from('transactions').insert({
    user_id: user.id,
    type,
    amount,
    transaction_date,
    category,
    description,
    payment_method,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/transactions')
  revalidatePath('/dashboard')

  const saveAndAddAnother = formData.get('intent') === 'add-another'
  if (saveAndAddAnother) {
    return { error: '', success: true }
  }

  redirect('/dashboard/transactions')
}

export async function updateTransaction(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient()

  const type = formData.get('type') as string
  const amount = parseFloat(formData.get('amount') as string)
  const transaction_date = formData.get('transaction_date') as string
  const category = (formData.get('category') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const payment_method = (formData.get('payment_method') as string) || null

  if (!amount || amount <= 0) {
    return { error: 'Amount must be greater than 0.' }
  }
  if (!category) {
    return { error: 'Please choose or enter a category.' }
  }

  const { error } = await supabase
    .from('transactions')
    .update({ type, amount, transaction_date, category, description, payment_method })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/transactions')
  redirect('/dashboard/transactions')
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('transactions').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/transactions')
  return { error: '' }
}
