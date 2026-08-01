import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MyBudget - Expense Tracker',
    short_name: 'MyBudget',
    description: 'Track your income and expenses',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#100b21',
    theme_color: '#7c3aed',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
