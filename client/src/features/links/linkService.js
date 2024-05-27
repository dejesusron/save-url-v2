import axios from 'axios';

const API_URL = 'http://localhost:5001/api/links/';

// create a new link
const createLink = async (linkData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, linkData, config);

  return response.data;
};

// get user links
const getLinks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// get user link
const getLink = async (linkId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + linkId, config);

  return response.data;
};

// delete user link
const deleteLink = async (linkId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + linkId, config);

  return response.data;
};

const linkService = { createLink, getLinks, getLink, deleteLink };

export default linkService;
