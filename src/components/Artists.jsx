import React, { useState, useEffect } from 'react';

import Artistskeletion from '../loadingskeletons/Artistskeletion';
import { setartistvalue } from '../customhooks/Context';
import { APIFetch } from '../customhooks/APIFetch';

const Artists = () => {
  const [artists, setartists] = useState([
    { id: Math.random().toString(32).substring(2), name: '', images: '' },
  ]);
  const [loading, setloading] = useState(true);
  const setsong = setartistvalue();

  useEffect(() => {
    APIFetch('artists', 'top artists')
      .then(res => setartists(res.data.data.results))
      .catch(err => console.log(err))
      .finally(() => setTimeout(() => setloading(false), 700));
  }, []);

  const artistclickhandle = name => {
    APIFetch('songs', name)
      .then(res =>
        setsong({ index: 0, nestsearchdata: res?.data?.data?.results })
      )
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="mb-3 text-lg font-bold capitalize text-white">
          top artists
        </h1>
        <div className="scroll-none flex h-[11vw] w-full gap-5 overflow-x-auto max-sm:h-[35vw]">
          {loading ? (
            <Artistskeletion />
          ) : (
            artists.map(({ id, name, image }) => (
              <div
                key={id}
                onClick={() => artistclickhandle(name)}
                className=" relative aspect-square w-[13vw] cursor-pointer rounded-3xl bg-[#ffffff1a] shadow max-sm:w-[35vw] max-sm:cursor-default"
              >
                <img
                  src={image?.at(-1)?.link}
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
