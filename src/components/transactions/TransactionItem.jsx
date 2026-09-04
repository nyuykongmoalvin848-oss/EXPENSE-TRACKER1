import { useCategories } from '../../context/CategoriesContext'

export default function TransactionItem ({ transaction, onDelete }) {
  const { categories } = useCategories()
  const cat = categories.find((c) => c.id === transaction.category)

  return (
    <li className={`list-item ${transaction.type}`}>
      <span className='cat-dot' />
      <div className='tx-info'>
        <span className='tx-desc'>{transaction.description}</span>
        <span className='tx-meta'>
          {cat?.name || 'Uncategorised'} · {transaction.date}
          {transaction.note ? ` · ${transaction.note}` : ''}
        </span>
      </div>
      <span className='tx-amount'>
        {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
      </span>
      <button className='btn-delete' onClick={() => onDelete(transaction.id)}>Delete</button>
    </li>
  )
}
