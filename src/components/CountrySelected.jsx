import React from 'react';
import { BsFillReplyFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setCountrySelected, setIfCountrySelected, } from '../store/countriesSlice';

function CountrySelected({ country }) {
  const dispatch = useDispatch();
  const nativeNames = country.name.nativeName;
  const currencie = country.currencies;
  const languages = country.languages;

  const handleClick = (country) => {
    dispatch(setCountrySelected(country));
  };

  const handleBack = () => {
    dispatch(setIfCountrySelected());
    dispatch(setCountrySelected(''));
  };

  return (
    <div className="country-card-selected">
      <button onClick={() => handleBack()}>
        <BsFillReplyFill />
        Back
      </button>
      <img src={country.flags.png} alt="flag" />
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
            {country.tld}
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
            <b>Border Countries: </b>
          </h3>
          {country.hasOwnProperty('borders') ? (
            <ul>
              {country.borders.map((countryBorder) => (
                <li key={uuidv4()} onClick={() => handleClick(countryBorder)}>
                  {countryBorder}
                </li>
              ))}
            </ul>
          ) : (
            <p>Has not Border Countries</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CountrySelected;
