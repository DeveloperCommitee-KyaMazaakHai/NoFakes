import React from 'react';
import classNames from 'classnames';
// import { Link } from 'react-router-dom';
import Image from '../../elements/Image';
// import logosmall from '../../../public/static/images/Codeuino_Logo_Small.png'

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <h1 className="m-0">
          <img src='/static/images/Codeuino_Logo_Small.png' width={32}></img>
      </h1>
    </div>
  );
}

export default Logo;