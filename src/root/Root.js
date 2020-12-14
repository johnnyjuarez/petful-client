import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Landing from '../components/Landing/Landing';
import Pets from '../components/Adoption/Adoption';

function Root() {
  return (
    <Router>
      <Route path='/user-input' component={Pets} />
      <Route exact path='/' component={Landing} />
    </Router>
  );
}

export default Root;
