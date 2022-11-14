import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { BiChevronDown } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRegionSelected,
  setIfFilterOpen,
  setAvailablePages,
  setCurrentPage,
} from '../store/countriesSlice';

function Filter() {
  const dispatch = useDispatch();
  const regionSelected = useSelector((store) => store.countries.regionSelected);
  const isFilterOpen = useSelector((store) => store.countries.isFilterOpen);

  const handleFilterState = () => {
    dispatch(setIfFilterOpen());
  };

  const handleOption = (option) => {
    if (regionSelected !== option) {
      dispatch(setRegionSelected(option));
    }
    dispatch(setIfFilterOpen());
    dispatch(setCurrentPage(0));
  };

  const handleReset = () => {
    dispatch(setRegionSelected('all'));
    dispatch(setAvailablePages(0));
    dispatch(setCurrentPage(0));
    if (isFilterOpen) {
      dispatch(setIfFilterOpen());
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-bar">
        <p onClick={() => handleFilterState()}>
          {regionSelected === 'all' ? 'Filter by Region' : regionSelected}
        </p>
        <div className="filter-icons">
          <BiChevronDown
            id="dropdown-icon"
            onClick={() => handleFilterState()}
          />
          <IoIosClose id="close-icon" onClick={() => handleReset()} />
        </div>
      </div>
      {isFilterOpen && (
        <div className="regions-list">
          <ul>
            <li onClick={() => handleOption('Africa')}>Africa</li>
            <li onClick={() => handleOption('Americas')}>America</li>
            <li onClick={() => handleOption('Asia')}>Asia</li>
            <li onClick={() => handleOption('Europe')}>Europe</li>
            <li onClick={() => handleOption('Oceania')}>Oceania</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Filter;
