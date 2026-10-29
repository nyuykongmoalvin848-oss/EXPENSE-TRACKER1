import TransactionItem from './TransactionItem'

export default function TransactionList ({ transactions, onDelete }) {
  if (!transactions.length) {
    return <p className='empty-state'>No transactions yet. Add one above to get started.</p>
  }

  return (
    <ul className='list'>
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
      ))}
    </ul>
  )
}
