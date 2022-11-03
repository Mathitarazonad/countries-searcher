import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Browser from './components/Browser';
import Filter from './components/Filter';
import Header from './components/Header';
import './styles/main.css';
import { getAllCountries } from './store/countriesSlice';
import CountriesList from './components/CountriesList';
import CountrySelected from './components/CountrySelected';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])


  return (
    <div className="App">
      <Header />
      <main>
        <div className='main-container'>
          <Browser/>
          <Filter />
          <CountriesList />
          <CountrySelected />
        </div>
      </main>
    </div>
  );
}

export default App;
