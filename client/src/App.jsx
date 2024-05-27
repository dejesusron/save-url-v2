import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './pages/root-layout/RootLayout';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import UserLayout from './pages/user-layout/UserLayout';
import Users from './pages/users/Users';
import Links from './pages/links/Links';
import AddNew from './pages/add-item/AddItem';
import UpdateItem from './pages/update-item/UpdateItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/not-found/NotFound';
import Profile from './pages/profile/Profile';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/add' element={<AddNew />} />
            <Route path='/update/:id' element={<UpdateItem />} />
            <Route path='/me' element={<Profile />} />
          </Route>

          <Route element={<UserLayout />}>
            <Route path='/dashboard/home' element={<Dashboard />} />
            <Route path='/dashboard/users' element={<Users />} />
            <Route path='/dashboard/links' element={<Links />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer theme='dark' />
    </div>
  );
};

export default App;
