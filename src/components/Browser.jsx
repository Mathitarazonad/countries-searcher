import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setSearchedCountry } from '../store/countriesSlice';

function Browser() {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearchedCountry(e.target.value));
  };

  return (
    <div className="browser-container">
      <FaSearchLocation />
      <input placeholder="Search for a country..." onChange={handleChange}></input>
    </div>
  );
}

export default Browser;
