import React from 'react';
import {TbMoon} from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import changeTheme from '../store/themeSlice';

function Header () {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeTheme());
  }

  return(
    <header>
      <h2>Where in the world?</h2>
      <div className='theme-container'>
        <div className='theme-btn' onClick={() => handleClick()}>
          <TbMoon />
        </div>
        <p>Dark Mode</p>
      </div>
    </header>
  );
}

export default Header;