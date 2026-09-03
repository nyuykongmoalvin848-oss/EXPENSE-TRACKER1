import { Pencil, Trash2 } from 'lucide-react'
import { useCategories } from '../../context/CategoriesContext'

export default function TransactionItem ({ transaction, onEdit }) {
  const { categories } = useCategories()
  const cat = categories.find((c) => c.id === transaction.category)

  return (
    <li className={`list-item ${transaction.type}`}>
      <span className='cat-dot' style={{ background: cat?.colour || '#6b7280' }} />
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
      <button className='icon-btn' onClick={() => onEdit(transaction)} aria-label='Edit'>
        <Pencil size={16} />
      </button>
    </li>
  )
}