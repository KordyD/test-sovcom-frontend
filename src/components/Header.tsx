import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='flex justify-between rounded-md bg-blue-400 px-10 py-5 text-2xl text-white'>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'underline' : 'hover:underline'
        }
        to='/'
      >
        Word Keeper
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'underline' : 'hover:underline'
        }
        to='/favorites'
      >
        Starred words
      </NavLink>
    </header>
  );
};

export default Header;
