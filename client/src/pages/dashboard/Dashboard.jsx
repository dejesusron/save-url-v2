import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }

    if (user?.role === 'user') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='grid place-items-center'>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
