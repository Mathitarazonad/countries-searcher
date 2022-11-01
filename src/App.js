import Browser from './components/Browser';
import Filter from './components/Filter';
import Header from './components/Header';
import './styles/main.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Browser/>
      <Filter />
    </div>
  );
}

export default App;
