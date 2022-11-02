import React from 'react';
import { IoIosClose } from 'react-icons/io';

function Filter() {
  return (
    <div className='filter-container'>
      <select name='regions' className='region-select' defaultValue={'all'}>
        <option value='all' disabled hidden>
          Search by Region
        </option>
        <option value='africa'>Africa</option>
        <option value='america'>America</option>
        <option value='asia'>Asia</option>
        <option value='europe'>Europe</option>
        <option value='oceania'>Oceania</option>
      </select>
      <IoIosClose id='close-icon'/>
    </div>
  );
}

export default Filter;
