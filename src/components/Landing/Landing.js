import React from 'react';
import adoptImg from '../../images/adopt-pet.jpg';
import { Link } from 'react-router-dom';
import './Landing.css';
export default function Landing() {
  return (
    <div className='landing-container'>
      <h1 className='landing-header'>Petful</h1>
      <p>A first in first out adoption agency site!</p>
      <img className='landing-image' src={adoptImg} alt='adopt' />
      <p>
        Click
        <span>
          <Link className='landing-btn' to='/user-input'>
            {' '}
            here{' '}
          </Link>
        </span>
        to begin!
      </p>
    </div>
  );
}
