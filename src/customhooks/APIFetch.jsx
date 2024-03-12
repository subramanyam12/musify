import axios from 'axios';

export const APIFetch = async (query = '') => {
  return await axios.get(
    `https://saavn.dev/api/search?query=${query}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const playlistfetch = async (id, name = "artist") => {
  return await axios.get(`https://saavn.dev/api/${name}s/${id}/songs`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const song_album_fetch = async (name, type = 'song', limit = '15') => {
  return await axios.get(`https://saavn.dev/api/search/${type}s?query=${name}&limit=${limit}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
}

export const albumsfetch = async (id) => {
  return await axios.get(`https://saavn.dev/api/albums?id=${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
}


