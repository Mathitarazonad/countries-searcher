import React from 'react';
import {TbMoon} from 'react-icons/tb';

function Header () {
  return(
    <header>
      <h2>Where in the world?</h2>
      <div className='theme-container'>
        <div className='theme-btn'>
          <TbMoon />
        </div>
        <p>Dark Mode</p>
      </div>
    </header>
  );
}

export default Header;