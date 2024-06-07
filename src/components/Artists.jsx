import React, { useState, useEffect } from 'react';

import Artistskeletion from '../loadingskeletons/Artistskeletion';
import { setartistvalue } from '../customhooks/Context';
import { song_album_fetch, playlistfetch } from '../customhooks/APIFetch';

const Artists = () => {
  const [artists, setartists] = useState([
    { id: Math.random().toString(32).substring(2), name: '', images: '' },
  ]);
  const [loading, setloading] = useState(true);
  const setsong = setartistvalue();

  useEffect(() => {
    song_album_fetch('top artists', 'artist')
      .then(res => {
        // res.data.data.results.length = 4;
        setartists(res?.data?.data?.results)
      })
      .catch(err => console.log(err))
      .finally(() => setTimeout(() => setloading(false), 700));
  }, []);

  const artistclickhandle = (id) => {
    playlistfetch(id)
      .then(res => setsong({ index: 0, nestsearchdata: res?.data?.data?.songs }))
      .catch(err => console.log(err));
  };

  return (

    <div className="w-full">
      <h1 className="mb-3 text-lg font-bold capitalize text-white">
        top artists
      </h1>
      <div className="flex h-[11vw] w-full overflow-auto scroll-none max-sm:h-[35vw]">
        <div className='flex h-full gap-5'>
          {
            loading ? (
              <Artistskeletion />
            ) : (
              artists?.map(({ id, name, image }) => (
                <div
                  key={id}
                  onClick={() => artistclickhandle(id)}
                  className=" relative aspect-squar h-full w-[11vw] cursor-pointer rounded-3xl bg-[#ffffff1a] shadow max-sm:w-[35vw] max-sm:cursor-default"
                >
                  <img
                    src={image?.at(-1)?.url}
                    alt={name}
                    className="h-full w-full rounded-3xl"
                  />
                  <div
                    style={{ WebkitBackdropFilter: 'blur(16px)' }}
                    className="absolute bottom-0 w-full rounded-b-3xl bg-[#1d1c1c15] p-2 text-center  text-sm font-semibold text-white backdrop-blur-lg max-sm:text-xs "
                  >
                    {name.length > 15 ? name.substring(0, 15) + '...' : name}
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
    </div>

  );
};

export default Artists;
