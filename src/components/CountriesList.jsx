import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, setAvailablePages, setCurrentPage } from '../store/countriesSlice';
import CountryCard from './CountryCard';
import { v4 as uuidv4 } from 'uuid';
import { chunk } from 'lodash';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

function CountriesList() {
  const dispatch = useDispatch();

  //Variables with useSelector
  const fetchedCountries = useSelector(store => store.countries.fetchedCountries);
  const regionSelected = useSelector(store => store.countries.regionSelected);
  const allCountries = useSelector(store => store.countries.allCountries).flat().filter(country => country.name.common !== 'Antarctica');
  const searchedCountry = useSelector(store => store.countries.searchedCountry);
  const currentPage = useSelector(store => store.countries.currentPage);
  const availablePages = useSelector(store => store.countries.availablePages);

  //Functions to filter
  function filterBySearch() {
    return allCountries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()));
  }

  function filterByRegion() {
    return allCountries.filter(country => country.region === regionSelected);
  }

  function filterByBoth() {
    return allCountries
    .filter(country =>country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))
    .filter(country => country.region === regionSelected);
  }

  function renderElements(countryList) {
    return countryList.map((countryList,index) => 
      <div className={index === currentPage ? 'country-list current' : 'country-list'} key={index}>
        {countryList.map(country => <CountryCard country={country} key={uuidv4()}/>)}
      </div>
    )  
  }

  function handleChange(option) {
    dispatch(setCurrentPage(option)); 
  }

  //UseEffect hooks
  useEffect(() => {
    dispatch(fetchCountries(['ger', 'usa', 'bra', 'chi', 'rus', 'par', 'arg', 'esp']));
  }, [dispatch]);

  useEffect(() => {
    if(regionSelected !== '') {
      dispatch(setAvailablePages(chunk(filterByRegion(), 8).length));
    } else if (searchedCountry !== '') {
      dispatch(setAvailablePages(chunk(filterBySearch(), 8).length));
    } else if (searchedCountry !== '' && regionSelected !== '') {
      dispatch(setAvailablePages(chunk(filterByBoth, 8).length));
    }
  })

  return (
    <div className="countries-container">
      {regionSelected === 'all' && searchedCountry === ''
      //This render the main countries if any filter isn't active
        ? fetchedCountries.map(country => <CountryCard country={country} key={uuidv4()} />)

        //Filter only by Search input
        : searchedCountry !== '' && regionSelected === 'all'
        ? renderElements(chunk(filterBySearch(), 8))

        //Filter by Region and Search input
        : searchedCountry !== '' && regionSelected !== 'all' 
        ? renderElements(chunk(filterByBoth(), 8))

        //Filter only by Region
        : renderElements(chunk(filterByRegion(), 8))}

        {/* Buttons to change page */}
        {availablePages > 0 && <div className='changer-btns'>
          <AiOutlineArrowLeft onClick={() => handleChange('previous')} className='previous-icon'/>
          <AiOutlineArrowRight onClick={() => handleChange('next')} className='next-icon'/>
        </div>}
    </div>
  );
}

export default CountriesList;
