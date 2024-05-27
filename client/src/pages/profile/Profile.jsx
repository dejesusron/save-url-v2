import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';
import {
  userDetails,
  deleteUser,
  logout,
  reset,
} from '../../features/auth/authSlice';
import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, details } = useSelector((state) => state.auth);
  const { isError, isLoading, message } = useSelector((state) => state.links);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/');
    } else {
      dispatch(userDetails(user._id));
    }
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${details.name}?`
    );

    if (confirmDelete) {
      dispatch(deleteUser(user._id));
      dispatch(reset());
      toast.success(`User ${details.name} successfully deleted`);
    }
  };

  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='min-h-screen py-32'>
          <div className='grid place-items-center'>
            <div className='card card-compact w-full md:w-[400px] bg-base-100 shadow-xl'>
              <figure>
                <img
                  src='https://images.unsplash.com/photo-1716404084927-176ee37a9dbe?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='Shoes'
                  className='h-[250px] w-full object-cover'
                />
              </figure>
              <div className='card-body'>
                <p>
                  <span className='font-bold'>Name: </span>
                  {details.name}
                </p>
                <p>
                  <span className='font-bold'>Email: </span>
                  {details.email}
                </p>
                <p>
                  <span className='font-bold'>Birthday: </span>
                  {new Date(details.birthday).toLocaleDateString('en-US')}
                </p>
                <p>
                  <span className='font-bold'>Role: </span>
                  {details.role}
                </p>
                <p>
                  <span className='font-bold'>Created: </span>
                  {new Date(details.createdAt).toLocaleDateString('en-US')}
                </p>
                <div className='card-actions justify-end'>
                  <div className='tooltip' data-tip='Delete account'>
                    <button
                      onClick={() => handleDelete()}
                      className='btn btn-error'
                    >
                      <FaTrashCan className='text-white text-lg' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
