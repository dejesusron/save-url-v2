import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createLink } from '../../features/links/linkSlice';
import Loading from '../../components/loading/Loading';
import { toast } from 'react-toastify';
import { reset } from '../../features/links/linkSlice';

const AddNew = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    type: '',
  });

  const { title, description, url, type } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { links, isLoading, isError, message } = useSelector(
    (state) => state.links
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/');
    }

    dispatch(reset());
  }, [links, isError, message, dispatch, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { title, description, url, type };

    dispatch(createLink(userData));
    toast.success('URL added successfully');
    navigate('/');
    setFormData({
      title: '',
      description: '',
      url: '',
      type: '',
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='min-h-screen grid place-items-center'>
          <div className='px-6 py-10 shadow-lg rounded-lg border border-slate-300 w-full md:w-[400px]'>
            <h1 className='font-bold text-3xl mb-10'>Add new URL</h1>

            <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  placeholder='Title'
                  className='input input-bordered w-full'
                  onChange={handleChange}
                  name='title'
                  value={title}
                  required
                />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Description'
                  className='input input-bordered w-full'
                  onChange={handleChange}
                  name='description'
                  value={description}
                  required
                />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='URL'
                  className='input input-bordered w-full'
                  onChange={handleChange}
                  name='url'
                  value={url}
                  required
                />
              </div>
              <div>
                <select
                  className='select select-bordered w-full'
                  onChange={handleChange}
                  name='type'
                  value={type}
                  required
                >
                  <option disabled value=''>
                    Type of URL
                  </option>
                  <option value='web'>Web</option>
                  <option value='video'>Video</option>
                </select>
              </div>
              <div>
                <button type='submit' className='btn btn-neutral w-full'>
                  Add
                </button>
              </div>
            </form>
            <div className='flex justify-end'>
              <Link to='/' className='btn btn-error mt-4 w-full'>
                <p className='text-white'>Exit</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
