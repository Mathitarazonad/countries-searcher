import React from 'react';
import { BsFillReplyFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCountrySelected,
  setIfCountrySelected,
} from '../store/countriesSlice';

function CountrySelected({ country }) {
  const dispatch = useDispatch();
  const nativeNames = country.name.nativeName;
  const currencie = country.currencies;
  const languages = country.languages;
  const allCountries = useSelector(
    (store) => store.countries.allCountries
  ).flat();

  const handleClick = (country) => {
    dispatch(setCountrySelected(country));
  };

  const handleBack = () => {
    dispatch(setIfCountrySelected());
    dispatch(setCountrySelected(''));
  };

  return (
    <div className="country-card-selected">
      <div className='back-btn'>
        <button onClick={() => handleBack()}>
        <BsFillReplyFill />
        Back
        </button>
      </div>
      <img src={country.flags.png} alt="flag" className='country-selected-flag'/>
      <section className="__info">
        <h2>{country.name.common}</h2>
        <div className="-geografy">
          <p>
            <b>Native Name: </b>
            {nativeNames[Object.getOwnPropertyNames(nativeNames)[0]].common}
          </p>
          <p>
            <b>Population: </b>
            {Intl.NumberFormat('en-US').format(country.population)}
          </p>
          <p>
            <b>Region: </b>
            {country.region}
          </p>
          <p>
            <b>Sub Region: </b>
            {country.subregion}
          </p>
          <p>
            <b>Capital: </b>
            {country.capital}
          </p>
        </div>
        <div className="-culture">
          <p>
            <b>Top Level Domain: </b>
            {country.tld[0]}
          </p>
          <p>
            <b>Currencies: </b>
            {currencie[Object.getOwnPropertyNames(currencie)[0]].name}
          </p>
          <p>
            <b>Languages: </b>
            {Object.values(languages).join(', ')}
          </p>
        </div>
        <div className="-border-countries">
          <h3>
            <b>Border Countries</b>
          </h3>
          {country.hasOwnProperty('borders') ? (
            <ul>
              {country.borders.map((countryBorder) => (
                <li key={uuidv4()} onClick={() => handleClick(countryBorder)}>
                  {allCountries.filter((country) => country.cca3 === countryBorder)[0].name.common}
                  <img
                    src={
                      allCountries.filter(
                        (country) => country.cca3 === countryBorder
                      )[0].flags.png
                    }
                    alt="flag"
                    className="border-flag"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className='not-borders-msg'>Has not Border Countries</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CountrySelected;
