import React, { useState, useEffect } from 'react';
import { albumsfetch, song_album_fetch } from '../customhooks/APIFetch';
import { AiFillPlayCircle } from 'react-icons/ai';

import Artists from './Artists';
import Introskeletion from '../loadingskeletons/Introskeletion';

import { setartistvalue } from '../customhooks/Context';

const Introduction = () => {
  const [trending, settrending] = useState([]);
  const [loading, setloading] = useState(true);
  const setsong = setartistvalue();

  useEffect(() => {
    song_album_fetch('trending playlists', 'album', 10)
      .then(res => settrending(res.data?.data?.results))
      .catch(err => console.log(err))
      .finally(() => setTimeout(() => setloading(false), 700));
  }, []);

  const handletrendingclick = id => {
    albumsfetch(id)
      .then(res => setsong({ index: 0, nestsearchdata: res.data?.data?.songs }))
      .catch(err => console.log(err));
  };

  return (
    <div className="flex h-full flex-col justify-around  max-sm:justify-start max-sm:gap-4 max-sm:pt-4">
      <div
        style={{ scrollSnapType: 'x mandatory' }}
        className="scroll-none flex h-[23vw] w-full overflow-auto rounded-3xl py-2 shadow-lg max-sm:h-[33vh]"
      >
        <div className="flex h-full gap-3">
          {loading ? (
            <Introskeletion />
          ) : (
            trending?.map(({ id, name, image, language }) => (
              <div
                key={id}
                style={{ scrollSnapAlign: 'center' }}
                className="group relative aspect-[1.5/1] rounded-3xl bg-[#ffffff1a] shadow"
              >
                <img
                  src={image?.at(-1)?.url}
                  alt={name}
                  className="object-cove h-full w-full rounded-3xl"
                />
                <div className="absolute bottom-0 left-0 flex h-full w-full flex-col items-center justify-center rounded-3xl bg-[#000000a2] pt-20 text-center font-semibold text-[#ffffffb7] opacity-0 duration-300 group-hover:opacity-100">
                  <AiFillPlayCircle
                    onClick={() => handletrendingclick(id)}
                    className="mb-3 cursor-pointer rounded-full bg-gray-300 text-5xl text-[#0000ffaf] transition max-sm:cursor-default"
                  />
                  <p>
                    <span className="text-xl font-bold text-white">{name}</span>
                    <br />
                    {language}{' '}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Artists />
    </div>
  );
};

export default Introduction;
