import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteLink } from '../../features/links/linkSlice';
import { FaTrashCan } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CardLink = ({ link }) => {
  const dispatch = useDispatch();

  const deleteURL = () => {
    if (window.confirm(`Are you sure you want to delete ${link.title}`)) {
      dispatch(deleteLink(link._id));
      toast.success(`${link.title} successfully deleted`);
    }
  };

  return (
    <li>
      <div
        className={`card w-full bg-base-100 shadow-xl border relative ${
          link.type === 'video' ? 'bg-green-100' : 'bg-orange-100'
        }`}
      >
        <div className='card-body p-4'>
          <h2 className='card-title line-clamp-1'>{link.title}</h2>
          <p className='line-clamp-1'>{link.description}</p>
          <a href={`${link.url}`} target='_blank' className='underline'>
            Visit link
          </a>
          <p className='text-sm absolute bottom-4 left-4'>
            {new Date(link.createdAt).toLocaleDateString('en-US')}
          </p>
          <div className='card-actions justify-end mt-6'>
            <div className='tooltip' data-tip='Update'>
              <Link to={`/update/${link._id}`} className='btn btn-neutral'>
                <FaEdit className='text-white text-lg' />
              </Link>
            </div>
            <div className='tooltip' data-tip='Delete'>
              <button onClick={() => deleteURL()} className='btn btn-error'>
                <FaTrashCan className='text-white text-lg' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardLink;
