import axios from 'axios';

export const APIFetch = async (type = 'all', query = '', limit = 20) => {
  return await axios.get(
    `https://saavn.dev/search/${type}?query=${query}&limit=${limit}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const playlistfetch = async (name, queryname, query) => {
  return await axios.get(`https://saavn.dev/${name}s?${queryname}=${query}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const fetchhomepage = () => {
  return axios.get('https://saavn.dev/modules?language=hindi,english,telugu');
};
