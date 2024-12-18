import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import decode from 'jwt-decode';

import Avatar from '../Avatar/Avatar';
import { setCurrentUser } from '../../actions/currentUser';

import logo from '../../assets/logo_d.png';
import search from '../../assets/search.png';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
    navigate('/');
    dispatch(setCurrentUser(null));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/Questions?s=${searchTerm}`);
    }
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    // eslint-disable-next-line
  }, [User?.token, dispatch]);

  return (
    <nav className='fixed top-0 left-0 w-full min-h-[50px] m-0 border-t-[3px] border-t-[#ef8236] shadow-[0px_1px_5px_#00000033] z-[15] bg-[#f8f9f9] flex justify-center items-center'>
      <div className='h-full min-w-[85%] xl:w-[1440px] xl:min-w-0 flex items-center justify-center'>
        <div className='flex items-center flex-grow w-[40%]'>
          <Link to='/' className='p-[5px_25px]'>
            <img src={logo} alt='logo' className='w-36' />
          </Link>
          <Link
            to='/'
            className='text-sm font-medium text-[#454545] no-underline transition-all duration-200 cursor-pointer rounded-[20px] p-[10px_20px] hover:bg-[#e2e2e2] hover:text-[#ef8236]'
          >
            Community
          </Link>
        </div>
        <div className='flex items-center mx-4 w-[60%]'>
          <form
            className='flex-grow p-0 relative group'
            onSubmit={handleSearch}
          >
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='min-w-[80%] m-0 p-[8px_10px_8px_32px] text-[13px] border border-[#0000003e] rounded transition-all duration-200 focus:outline-none focus:border-[#009dff] focus:shadow-[0_0_5px_rgba(0,157,255,0.3)] focus:bg-white group-hover:border-gray-400'
            />
            <img
              src={search}
              alt='search'
              width='18'
              className='absolute left-2 top-1/2 transform -translate-y-1/2 transition-all duration-200 group-hover:opacity-70'
            />
          </form>

          {User === null ? (
            <Link
              to='/Auth'
              className='px-[13px] py-[7px] border border-[#009dff] rounded bg-[#e7f8fe] cursor-pointer text-[#454545] no-underline text-sm font-medium hover:bg-[#d3e4eb] hover:text-[#009dff] transition-all duration-300 transform hover:scale-105'
            >
              Log In
            </Link>
          ) : (
            <>
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
                className='group-hover:text-[#009dff] '
              >
                <Avatar
                  backgroundColor='#009dff'
                  px='13px'
                  py='7px'
                  borderRadius='50%'
                  color='white'
                  className='transition-all duration-200 hover:bg-white hover:border-2 hover:border-[#009dff] group '
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
              <button
                className='ml-3 px-[13px] py-[7px] border border-[#009dff] rounded bg-[#e7f8fe] cursor-pointer text-[#454545] text-sm font-medium hover:bg-[#d3e4eb] hover:text-[#009dff] transition-all duration-300 transform hover:scale-105'
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
