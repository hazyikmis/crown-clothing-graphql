import React from 'react';

import './spinner.styles.scss';

const Spinner = () => (
  <div className='spinner-overlay'>
    <div className='spinner-container' />
  </div>
);

export default Spinner;

//In this app, the method we have used allows us to keep the spinner
//simple and not having to be a HOC. 