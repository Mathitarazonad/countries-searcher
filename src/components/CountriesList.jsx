import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries } from '../store/countriesSlice';
import CountryCard from './CountryCard';
import { v4 as uuidv4 } from 'uuid';

function CountriesList() {
  const dispatch = useDispatch();
  const countriesToRender = useSelector(
    (store) => store.countries.countriesToRender
  );
  const fetchedCountries = useSelector(
    (store) => store.countries.fetchedCountries
  );
  const regionSelected = useSelector(store => store.countries.regionSelected);
  const allCountries = useSelector(store => store.countries.allCountries).flat();

  useEffect(() => {
    dispatch(fetchCountries(countriesToRender));
  }, [countriesToRender]);

  return (
    <div className="countries-container">
      {regionSelected === '' ?
      fetchedCountries.map((country) => (
        <CountryCard country={country} key={uuidv4()} />
      )) : allCountries
      .filter(country => country.region === regionSelected)
      .map(country => <CountryCard country={country} key={uuidv4()} />)}
    </div>
  );
}

export default CountriesList;
