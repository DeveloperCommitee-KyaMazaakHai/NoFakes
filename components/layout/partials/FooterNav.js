import React from 'react';
import classNames from 'classnames';
// import { a } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <a href="https://codeuino.com#contact-us" target="_blank">Contact</a>
        </li>
        <li>
          <a href="https://codeuino.com" target="_blank">About us</a>
        </li>
        {/*<li>*/}
        {/*  <a href="#0">FAQ's</a>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <a href="#0">Support</a>*/}
        {/*</li>*/}
      </ul>
    </nav>
  );
}

export default FooterNav;