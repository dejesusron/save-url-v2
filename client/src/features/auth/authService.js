import axios from 'axios';

const API_URL = 'https://save-url-v2.onrender.com/api/users/';

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = async () => {
  localStorage.removeItem('user');
};

// get user details
const userDetails = async (linkId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'me', config);

  return response.data;
};

// delete user
const deleteUser = async (userId) => {
  const response = await axios.delete(API_URL + userId);

  return response.data;
};

const authService = { register, logout, login, userDetails, deleteUser };

export default authService;
