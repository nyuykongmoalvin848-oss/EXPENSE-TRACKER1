export default function TransactionItem({ transaction, onDelete }) {
  return (
    <li className={`list-item ${transaction.type}`}>
      <span>{transaction.description}</span>
      <span>{transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}</span>
      <button onClick={() => onDelete(transaction.id)}>x</button>
    </li>
  )
}
