import React from 'react'
import { useDispatch } from 'react-redux';
import { setCountrySelected, setIfCountrySelected } from '../store/countriesSlice';

function CountryCard({country}) {
  const dispatch = useDispatch();
  const handleClick = (country) => {
    dispatch(setIfCountrySelected());
    dispatch(setCountrySelected(country));
  };

  return (
    <article className='country-card' onClick={() => handleClick(country.cca3)}>
      <img src={country.flags.png} alt='countryFlag'/>
      <section className='country-info'>
        <h2>{country.name.common}</h2>
        <p><b>Population: </b>{Intl.NumberFormat('en-US').format(country.population)}</p>
        <p><b>Region: </b>{country.subregion}</p>
        <p><b>Capital: </b>{country.capital}</p>
      </section>
    </article>
  )
}

export default CountryCard;
