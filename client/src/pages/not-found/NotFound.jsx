import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-screen grid place-items-center'>
      <div className='card card-side bg-base-100 shadow-xl'>
        <figure>
          <img
            src='https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg'
            alt='Movie'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>404, URL not found!</h2>
          <p>Click the button to go back in the home page.</p>
          <div className='card-actions justify-end'>
            <Link className='btn btn-neutral' to='/signin'>
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
