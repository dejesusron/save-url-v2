import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/loading/Loading';
import { login, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      if (user.role === 'admin') {
        navigate('/dashboard/home');
      } else {
        navigate('/');
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className='container mx-auto px-4 min-h-screen grid place-items-center'>
        <div className='shadow-lg p-6 border border-slate-300 rounded-lg w-[100%] md:max-w-lg'>
          <h1 className='mb-10 font-bold text-3xl text-center'>Sign in</h1>

          <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
            <div>
              <input
                type='email'
                placeholder='Email'
                className='input input-bordered w-full'
                name='email'
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='relative'>
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                placeholder='Password'
                className='input input-bordered w-full pr-10'
                name='password'
                value={password}
                onChange={handleChange}
                required
              />
              <div
                className='absolute top-[50%] right-4 translate-y-[-50%] z-10 cursor-pointer w-max'
                onClick={handleShowPassword}
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div>
              <button type='submit' className='btn btn-neutral w-full'>
                Sign in
              </button>
            </div>
          </form>
          <p className='mt-4'>
            Do not have an account?{' '}
            <Link to='/signup' className='underline text-blue-500'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
