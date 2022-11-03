import React from 'react'

function CountryCard({country}) {
  return (
    <article className='country-card'>
      <img />
      <section className='country-info'>
        <h2>{country.name.common}</h2>
        <p><b>Population: </b>{country.population}</p>
        <p><b>Region: </b>{country.subregion}</p>
        <p><b>Capital: </b>{country.capital}</p>
      </section>
    </article>
  )
}

export default CountryCard;
