import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../redux/features/userSlice';
import Search from './Search';

function UserNavbar(props) {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className='fixed w-full z-10 top-0 bg-white '>
      <nav className='px-2 py-4 shadow-md '>
        <div className='w-screen sm:mt-0 sm:container flex flex-wrap justify-between items-center mx-auto'>
          <div className=''>
            <span className='text-bold text-xl sm:text-3xl italic font-semibold self-center cursor-pointer select-none'><Link to="/" className='link'>Doctor Link</Link></span>
          </div>
          {location.pathname === '/' && <Search onSearchData={props.onSearchData} />}
          <div className='items-center'>

            <Link to="/appointments" className='link text-xs sm:text-lg cursor-pointer hover:text-blue-500 duration-500'>Appointments</Link>

            {isLoggedIn ? (
              <button
                className="bg-blue-500 text-white font-[Poppins] duration-500 p-1 sm:px-4 py-0 text-xs sm:text-lg sm:py-1 mx-3 sm:mx-4 hover:bg-blue-600 rounded "
                onClick={() => dispatch(userLogout())}
              >
                Sign Out
              </button>
            ) : (
              <button className="bg-blue-400 text-white font-[Poppins] duration-500 p-1 sm:px-4 py-0 text-xs sm:text-lg sm:py-1 mx-3 sm:mx-4 hover:bg-blue-500 rounded "
                onClick={() => navigate('/signin')}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default UserNavbar;
