import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setSearchedCountry } from '../store/countriesSlice';

function Browser() {
  const dispatch = useDispatch();
  const currentPage = useSelector(store => store.countries.currentPage);
  const availablePages = useSelector(store => store.countries.availablePages);

  const handleChange = (e) => {
    dispatch(setSearchedCountry(e.target.value));
    dispatch(setCurrentPage(0));
  };

  return (
    <div className="browser-container">
      <FaSearchLocation />
      <input placeholder="Search for a country..." onChange={handleChange}></input>
    </div>
  );
}

export default Browser;
