import React, { useState, useEffect } from 'react';
import { contextvalue } from '../customhooks/Context';
import ADAlayout from '../components/ADAlayout';

const Albums = () => {
  const [albumdata, setalbumdata] = useState([]);
  const { homedata } = contextvalue();

  useEffect(() => {
    setalbumdata(homedata?.albums);
  }, []);

  return <ADAlayout heading="albums" data={albumdata} />;
};

export default Albums;
