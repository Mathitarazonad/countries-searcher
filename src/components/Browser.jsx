import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';

function Browser() {
  return (
    <div className="browser-container">
      <FaSearchLocation />
      <input placeholder="Search for a country..."></input>
    </div>
  );
}

export default Browser;
