import React, { useState, useEffect } from 'react';
import ADAlayout from '../components/ADAlayout';

const Artistpage = () => {
  const [artistdata, setartistdata] = useState([]);


  return <ADAlayout heading="playlists" data={artistdata} />;
};

export default Artistpage;
