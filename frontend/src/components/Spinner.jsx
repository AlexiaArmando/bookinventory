import React from 'react';
import '../styles/loader.css';

const Spinner = ({ isFull }) => {
  return (
    <div className={isFull ? 'spinner full' : 'spinner normal'}>
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" className="path"></circle>
      </svg>
    </div>
  )
}

export default Spinner;