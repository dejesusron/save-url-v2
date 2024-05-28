import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CardLink from '../../components/card-link/CardLink';
import Loading from '../../components/loading/Loading';
import { getLinks, reset } from '../../features/links/linkSlice';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { links, isLoading, isError, message } = useSelector(
    (state) => state.links
  );

  let userLinks;

  if (select === 'web') {
    userLinks = links
      .filter((item) => {
        return item.type === 'web';
      })
      .map((item) => {
        return <CardLink key={item._id} link={item} />;
      });
  } else if (select === 'video') {
    userLinks = links
      .filter((item) => {
        return item.type === 'video';
      })
      .map((item) => {
        return <CardLink key={item._id} link={item} />;
      });
  } else {
    userLinks = links.map((item) => {
      return <CardLink key={item._id} link={item} />;
    });
  }

  const searchLinks = links
    .filter((item) => {
      return item.title.includes(search);
    })
    .map((item) => {
      return <CardLink key={item._id} link={item} />;
    });

  const handleSearchLinks = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/signin');
    }

    if (user?.role === 'admin') {
      navigate('/dashboard');
    }

    dispatch(getLinks());

    return () => {
      dispatch(reset());
    };
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(links);

  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='min-h-screen py-32'>
          <div className='flex flex-col lg:flex-row justify-between gap-y-4'>
            <div className='w-full max-w-xl flex gap-x-2'>
              <select
                className='select select-bordered max-w-sm'
                onChange={handleSelect}
                value={select}
              >
                <option disabled selected value='all'>
                  Filter
                </option>
                <option value='all'>All</option>
                <option value='web'>Web</option>
                <option value='video'>Video</option>
              </select>
              <input
                type='text'
                placeholder='Search'
                className='input input-bordered w-full min-w-[200px]'
                onChange={handleSearchLinks}
              />
            </div>
            <Link
              to='/add'
              className='bg-slate-700 text-white py-3 px-10 rounded-md flex items-center gap-x-3 justify-center'
            >
              <p>Add new </p>
              <FaPlus />
            </Link>
          </div>

          <ul className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {links && (search ? searchLinks : userLinks)}
            {links.length === 0 && <h3>You have not set any links</h3>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
