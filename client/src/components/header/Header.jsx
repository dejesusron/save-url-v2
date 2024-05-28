import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const [signinPage, setSigninPage] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  const [userPage, setUserPage] = useState(false);
  const [adminPage, setAdminPage] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/signin');
  };

  useEffect(() => {
    if (location.pathname === '/signin') {
      setSigninPage(false);
      setSignupPage(true);
      setUserPage(false);
      setAdminPage(false);
    } else if (location.pathname === '/signup') {
      setSigninPage(true);
      setSignupPage(false);
      setUserPage(false);
      setAdminPage(false);
    } else if (location.pathname === '/') {
      setSigninPage(false);
      setSignupPage(false);
      setUserPage(true);
      setAdminPage(false);
    } else if (location.pathname === '/dashboard/home') {
      setSigninPage(false);
      setSignupPage(false);
      setUserPage(true);
      setAdminPage(true);
    }
  }, [location, navigate]);

  return (
    <div className='bg-slate-200 fixed top-0 left-0 w-full z-50'>
      <div className='container mx-auto px-4'>
        <div className='navbar p-0'>
          <div className='flex-1'>
            <Link className='text-2xl font-bold'>SaveURL.v2</Link>
          </div>
          <div className='flex-none'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <Link
                  to='/signin'
                  className={`${signinPage ? 'block' : 'hidden'} text-xl`}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to='/signup'
                  className={`${signupPage ? 'block' : 'hidden'} text-xl`}
                >
                  Sign up
                </Link>
              </li>
              {user && (
                <li>
                  <details>
                    <summary className='text-xl'>
                      {user ? `${user.name.split(' ')[0]}` : 'No user'}
                    </summary>
                    <ul className='p-2 bg-base-100 rounded-t-none shadow-lg border border-slate-300 w-max flex flex-col gap-y-2'>
                      {!adminPage ? (
                        <>
                          <li>
                            <Link to='/' className='text-md'>
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link to='/me' className='text-md'>
                              Profile
                            </Link>
                          </li>
                        </>
                      ) : null}

                      {user && (
                        <li>
                          <Link
                            onClick={onLogout}
                            className='btn btn-error flex items-center gap-x-2 px-2 py-1'
                          >
                            <p className='text-white'>Logout</p>
                            <FaSignOutAlt className='text-white' />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </details>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
