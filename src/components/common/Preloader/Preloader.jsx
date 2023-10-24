import React from 'react';
import classes from './Preloader.module.css';
import preloader from '../../../assets/images/preloader.png';

function Preloader() {
  return <img alt='preloader' className={classes.preloader} src={preloader} />;
}

export default Preloader;
