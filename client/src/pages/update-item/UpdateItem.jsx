import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLink, reset } from '../../features/links/linkSlice';
import Loading from '../../components/loading/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { isError, isLoading, message, link, links } = useSelector(
    (state) => state.links
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/');
    }

    dispatch(getLink(id));

    return () => {
      dispatch(reset());
    };
  }, [navigate, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const linkData = { title, description, url, type };

    updateData(linkData);
  };

  const updateData = async (updatedData) => {
    if (window.confirm(`Are you sure you want to update ${title}?`)) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        await axios.put(
          `https://save-url-v2.onrender.com/api/links/${id}`,
          updatedData,
          config
        );
        toast.success('URL successfully updated');
        navigate('/');
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    setFormData({
      title: link.title,
      description: link.description,
      url: link.url,
      type: link.type,
    });
  }, [link]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='min-h-screen grid place-items-center'>
          <div className='px-6 py-10 shadow-lg rounded-lg border border-slate-300 w-full md:w-[400px]'>
            <h1 className='font-bold text-3xl mb-10'>Update URL</h1>

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
                  Update
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
