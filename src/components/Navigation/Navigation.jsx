import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const cssClasses = ({ isActive }) => clsx(css.link, isActive && css.active);
const Navigation = () => {
  return (
    <div>
      <NavLink className={cssClasses} to="/">
        HomePage
      </NavLink>
      <NavLink className={cssClasses} to="/movies">
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
