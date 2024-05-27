import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';
import Loading from '../../components/loading/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    role: 'user',
    name: '',
    birthday: '',
    email: '',
    password: '',
    password2: '',
    secret: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { role, name, birthday, email, password, password2, secret } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      secret: '',
    }));
  }, [role]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      if (user.role === 'admin') {
        navigate('/dashboard');
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

    if (role === 'admin' && secret !== 'ronel') {
      toast.error('Invalid admin');
    } else {
      if (password !== password2) {
        toast.error('Passwords do not match');
      } else {
        const userData = {
          role,
          name,
          birthday,
          email,
          password,
        };

        dispatch(register(userData));
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='mt-32'>
      <div className='container mx-auto px-4 min-h-screen flex justify-center'>
        <div className='shadow-lg px-6 py-10 border border-slate-300 rounded-lg w-[100%] md:max-w-lg h-max'>
          <h1 className='mb-10 font-bold text-3xl text-center'>Sign up</h1>

          <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
            <div className='flex gap-x-6'>
              <div className='flex items-center gap-x-2'>
                <input
                  type='radio'
                  className='radio'
                  name='role'
                  value='user'
                  onChange={handleChange}
                />
                <label>User</label>
              </div>
              <div className='flex items-center gap-x-2'>
                <input
                  type='radio'
                  className='radio'
                  name='role'
                  value='admin'
                  onChange={handleChange}
                />
                <label>Admin</label>
              </div>
            </div>

            {role == 'admin' ? (
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Secret key</span>
                </div>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full'
                  name='secret'
                  value={secret}
                  onChange={handleChange}
                />
              </label>
            ) : null}

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Name</span>
              </div>
              <input
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
                name='name'
                value={name}
                onChange={handleChange}
                required
              />
            </label>

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Birthday</span>
              </div>
              <input
                type='date'
                className='input input-bordered w-full'
                name='birthday'
                value={birthday}
                onChange={handleChange}
                required
              />
            </label>

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Email</span>
              </div>
              <input
                type='email'
                placeholder='Type here'
                className='input input-bordered w-full'
                name='email'
                value={email}
                onChange={handleChange}
                required
              />
            </label>

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Password</span>
              </div>
              <div className='relative'>
                <input
                  type={`${showPassword ? 'text' : 'password'}`}
                  placeholder='Type here'
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
            </label>

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Confirm password</span>
              </div>
              <div className='relative'>
                <input
                  type={`${showPassword2 ? 'text' : 'password'}`}
                  placeholder='Type here'
                  className='input input-bordered w-full pr-10'
                  name='password2'
                  value={password2}
                  onChange={handleChange}
                  required
                />
                <div
                  className='absolute top-[50%] right-4 translate-y-[-50%] z-10 cursor-pointer w-max'
                  onClick={handleShowPassword2}
                >
                  {!showPassword2 ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </label>

            <div className='mt-2'>
              <button type='submit' className='btn btn-neutral w-full'>
                Sign up
              </button>
            </div>
          </form>
          <p className='mt-4'>
            Already have an account?{' '}
            <Link to='/signin' className='underline text-blue-500'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
