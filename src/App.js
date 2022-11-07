import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Browser from './components/Browser';
import Filter from './components/Filter';
import Header from './components/Header';
import './styles/main.css';
import { getAllCountries } from './store/countriesSlice';
import CountriesList from './components/CountriesList';
import CountrySelected from './components/CountrySelected';

function App() {
  const dispatch = useDispatch();
  const allCountries = useSelector(
    (store) => store.countries.allCountries
  ).flat();
  const darkMode = useSelector((store) => store.theme.darkMode);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const isCountrySelected = useSelector(
    (store) => store.countries.isCountrySelected
  );

  const countrySelected = useSelector(
    (store) => store.countries.countrySelected
  );

  return (
    <div className={darkMode ? 'App dark-mode' : 'App'}>
      <Header />
      <main>
        <div className="main-container">
          {!isCountrySelected ? (
            <>
              <Browser />
              <Filter />
              <CountriesList />
            </>
          ) : (
            <CountrySelected
              country={allCountries.find(
                (country) => country.cca3 === countrySelected
              )}
            />
          )}
        </div>
      </main>
      <footer>
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="#">Mathías Tarazona</a>.
      </footer>
    </div>
  );
}

export default App;
