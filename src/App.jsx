import StatCards from './components/Dashboard/StatCards';
import './App.css';

const transactions = [];

function App() {
  return (
    <div className="wrap">
      <h1 className="title">Expense Tracker</h1>
      <StatCards transactions={transactions} />
    </div>
  );
}

export default App;
