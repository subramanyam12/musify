import React, { useState, useEffect } from 'react';
import ADAlayout from '../components/ADAlayout';
import { song_album_fetch } from '../customhooks/APIFetch';

const Discover = () => {
  const [discoverdata, setdiscoverdata] = useState([]);


  useEffect(() => {
    song_album_fetch('old playlists', 'album')
      .then(res => setdiscoverdata(res?.data?.data?.results))
      .catch(err => console.log(err));
  }, []);

  return <ADAlayout heading="old playlists" data={discoverdata} />;
};

export default Discover;
