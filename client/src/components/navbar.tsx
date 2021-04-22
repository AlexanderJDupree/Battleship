/**
 * Navbar react component. To add new NavItems to the NavItem simply add
 * the NavItem component with the correct properties. The routing is handled in
 * the root app.tsx file
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  path: string;
  text: string;
  activePath: string;
}

export const NavItem = ({ path, text, activePath }: NavItemProps) => {
  let active = activePath === path ? 'active' : '';
  return (
    <li className={`nav-item ${active}`}>
      <Link className='nav-link' to={path}>
        {text}
      </Link>
    </li>
  );
};

function Navbar() {
  let loc = useLocation().pathname;

  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Battleship
        </Link>

        <div>
          <ul className='navbar-nav ml-auto'>
            <NavItem path='/' activePath={loc} text='Home' />
            <NavItem path='/about' activePath={loc} text='About' />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
