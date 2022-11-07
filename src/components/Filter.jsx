import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setRegionSelected } from '../store/countriesSlice';

function Filter() {
  const dispatch = useDispatch();
  const regionSelected = useSelector((store) => store.countries.regionSelected);

  const handleChange = (e) => {
    dispatch(setRegionSelected(e.target.value));
  };

  const handleReset = () => {
    dispatch(setRegionSelected('all'));
  }

  return (
    <div className="filter-container">
      <select
        name="regions"
        className="region-select"
        onChange={handleChange}
        value={regionSelected}
      >
        <option value="all" disabled hidden>
          Search by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <IoIosClose id="close-icon" onClick={() => handleReset()} />
    </div>
  );
}

export default Filter;
