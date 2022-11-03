import React from 'react';
import { BsFillReplyFill } from 'react-icons/bs'

function CountrySelected({country}) {
  return (
    <div className='country-card-selected'>
      <button><BsFillReplyFill />Back</button>
      <img src='' alt='' />
      <section className='__info'>
        <h2></h2>
        <div className='-geografy'>
          <p><b>Native Name: </b></p>
          <p><b>Population: </b>11.319.511</p>
          <p><b>Region: </b>Europe</p>
          <p><b>Sub Region: </b>Wester Europe</p>
          <p><b>Capital: </b>Brussels</p>
        </div>
        <div className='-culture'>
          <p><b>Top Level Domain: </b>.be</p>
          <p><b>Currencies: </b>Euro</p>
          <p><b>Languages: </b></p>
        </div>
        <div className='-border-countries'>
          <b>Border Countries:</b>
        </div>
      </section>
    </div>
  )
}

export default CountrySelected;
