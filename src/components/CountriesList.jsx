import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, setCountriesToRender } from '../store/countriesSlice';
import CountryCard from './CountryCard';

function CountriesList() {
  const dispatch = useDispatch();
  const countriesToRender = useSelector(store => store.countries.countriesToRender);
  const fetchedCountries = useSelector(store => store.countries.fetchedCountries)

  useEffect(() => {
    dispatch(fetchCountries(countriesToRender))
  }, [countriesToRender])

  return (
    <div className='countries-container'>
      {fetchedCountries.map(
        country => <CountryCard country={country}/>
      )}
    </div>
  )
}

export default CountriesList;
