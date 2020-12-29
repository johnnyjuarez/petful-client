import React from 'react';
import { Link } from 'react-router-dom';

import './Congratulations.css';

export default function Congratulations() {
  return (
    <div>
      <h2>Congratulations on your Adoption!!!</h2>
      <Link className='congrat-btn' to='/'>
        Go Home
      </Link>
    </div>
  );
}
