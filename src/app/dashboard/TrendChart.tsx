'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts'

type MonthlyPoint = { month: string; income: number; expense: number }

export default function TrendChart({ data }: { data: MonthlyPoint[] }) {
  if (data.every((d) => d.income === 0 && d.expense === 0)) {
    return <p className="text-sm text-muted text-center py-12">No history yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
        <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted)" />
        <YAxis fontSize={12} stroke="var(--color-muted)" />
        <Tooltip formatter={(value) => `₹${Number(value).toFixed(2)}`} />
        <Legend />
        <Bar dataKey="income" fill="#059669" name="Income" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" fill="#e11d48" name="Expense" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}