import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setSearchedCountry, setPageAnimation } from '../store/countriesSlice';

function Browser() {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearchedCountry(e.target.value));
    dispatch(setCurrentPage(0));
    dispatch(setPageAnimation(''));
  };

  return (
    <div className="browser-container">
      <FaSearchLocation />
      <input placeholder="Search for a country..." onChange={handleChange}></input>
    </div>
  );
}

export default Browser;
