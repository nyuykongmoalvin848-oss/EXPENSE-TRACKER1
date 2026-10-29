import { useMemo } from 'react'
import { useTransactions } from '../context/TransactionsContext'
import Dashboard from '../components/Dashboard/Dashboard'

export default function DashboardPage () {
  const { transactions } = useTransactions()

  const now = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const monthly = useMemo(
    () => transactions.filter((t) => t.date.startsWith(month)),
    [transactions, month]
  )

  return <Dashboard transactions={monthly} />
}
