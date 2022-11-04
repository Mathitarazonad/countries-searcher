import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setRegionSelected } from '../store/countriesSlice';

function Filter() {
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(setRegionSelected(e.target.value))
  };

  return (
    <div className='filter-container'>
      <select name='regions' className='region-select' defaultValue={'all'} onChange={handleChange}>
        <option value='all' disabled hidden>
          Search by Region
        </option>
        <option value='Africa'>Africa</option>
        <option value='Americas'>America</option>
        <option value='Asia'>Asia</option>
        <option value='Europe'>Europe</option>
        <option value='Oceania'>Oceania</option>
      </select>
      <IoIosClose id='close-icon'/>
    </div>
  );
}

export default Filter;
