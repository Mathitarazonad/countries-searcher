import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, setAvailablePages, setCurrentPage, setPageAnimation } from '../store/countriesSlice';
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
  const pageAnimation = useSelector(store => store.countries.pageAnimation);

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

  function renderElements(filteredCountriesList) {
    return(
      <>
        {createPageBtns(filteredCountriesList)}
        {filteredCountriesList.map((countryList,index) => 
          <div className={index === currentPage ? `country-list current${' '+pageAnimation}`: 'country-list'} key={index}>
            {countryList.map(country => <CountryCard country={country} key={uuidv4()}/>)}
          </div>
        )}
     </>  
    )  
  }

  function createPageBtns(filteredCountriesList) {
    if (availablePages > 0) {
      return (
          <div className='mini-btns'>
            <AiOutlineArrowLeft onClick={() => handleChange('previous')} className='changer-btns' id='previous-icon'/>
            {filteredCountriesList.map((page, index) => <button className={index === currentPage ? 'page-btns current' : 'page-btns'} key={uuidv4()} onClick={() => handlePage(index)}>{index+1}</button>)}
            <AiOutlineArrowRight onClick={() => handleChange('next')} className='changer-btns' id='next-icon'/>
          </div>
      ) 
    }
  }

  function handleChange(option) {
    dispatch(setCurrentPage(option)); 
    if (currentPage <= availablePages && option === 'next') {
      dispatch(setPageAnimation('next'));
    } else if (currentPage => 0 && option ==='previous') {
      dispatch(setPageAnimation('previous'));
    }
  }

  function handlePage(option) {
    dispatch(setCurrentPage(option));
    if (currentPage <= availablePages && currentPage < option) {
      dispatch(setPageAnimation('next'));
    } else if (currentPage => 0 && currentPage > option) {
      dispatch(setPageAnimation('previous'));
    }
  } 

  //UseEffect hooks
  useEffect(() => {
    dispatch(fetchCountries(['ger', 'usa', 'bra', 'chi', 'rus', 'par', 'arg', 'esp']));
  }, [dispatch]);

  useEffect(() => {
    if(regionSelected !== '' && searchedCountry === '') {
      dispatch(setAvailablePages(chunk(filterByRegion(), 8).length-1));
    } else if (searchedCountry !== '' && regionSelected === 'all') {
      dispatch(setAvailablePages(chunk(filterBySearch(), 8).length-1));
    } else if (searchedCountry !== '' && regionSelected !== '') {
      dispatch(setAvailablePages(chunk(filterByBoth(), 8).length-1));
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
    </div>
  );
}

export default CountriesList;
