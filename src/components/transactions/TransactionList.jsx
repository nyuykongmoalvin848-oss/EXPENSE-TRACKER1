export default function TransactionList({ transactions }) {
  if (!transactions.length) return <p>No transactions yet.</p>

  return (
    <ul className='list'>
      {transactions.map((t) => (
        <li key={t.id} className={`list-item ${t.type}`}>
          <span>{t.description}</span>
          <span>{t.type === 'income' ? '+' : '-'}${Number(t.amount).toFixed(2)}</span>
          <button onClick={() => {}}>x</button>
        </li>
      ))}
    </ul>
  )
}
