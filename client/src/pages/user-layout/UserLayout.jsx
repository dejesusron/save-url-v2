import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserLayout = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }

    if (user?.role !== 'admin') {
      navigate('/signin');
    }
  }, [user, navigate]);
  return (
    <div>
      <Header />

      <div className='drawer lg:drawer-open'>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col items-center justify-center overflow-scroll min-h-[100vh]'>
          {/* Page content here */}
          <Outlet />

          <label
            htmlFor='my-drawer-2'
            className='btn btn-primary drawer-button lg:hidden'
          >
            Open drawer
          </label>
        </div>
        <div className='drawer-side pt-16 fixed h-screen'>
          <label
            htmlFor='my-drawer-2'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
            {/* Sidebar content here */}
            <li>
              <NavLink to='/dashboard/home'>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to='/dashboard/users'>Users</NavLink>
            </li>
            <li>
              <NavLink to='/dashboard/links'>Links</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
