import React, { useState, useEffect } from 'react';
import ADAlayout from '../components/ADAlayout';
import { song_album_fetch } from '../customhooks/APIFetch';


const Albums = () => {
  const [albumdata, setalbumdata] = useState([]);

  useEffect(() => {
    song_album_fetch('top albums', 'album')
      .then(res => setalbumdata(res?.data?.data?.results))
      .catch(err => console.log(err));
  }, []);

  return <ADAlayout heading="albums" data={albumdata} />;
};

export default Albums;
