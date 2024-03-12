import React, { useState, useEffect } from 'react';

import { albumsfetch } from '../customhooks/APIFetch';
import Nestsearchlayout from './search/Nestsearchlayout';

const ADAlayout = ({ heading, data }) => {
  const [nestsearchdata, setnestsearchdata] = useState([]);
  const [bool, setbool] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => setloading(false), 1000);
  }, []);

  const clickhandle = (id) => {
    setbool(true);
    albumsfetch(id)
      .then(res => setnestsearchdata(res?.data?.data?.songs))
      .catch(err => console.log(err))
      .finally(() => setloading(false));
  };

  return (
    <div className=" scroll-none bg-red-10 h-full w-full overflow-y-auto bg-[#ffffff28] max-sm:h-[83%]">
      {bool ? (
        <Nestsearchlayout setbool={setbool} nestdata={nestsearchdata} />
      ) : (
        <>
          <h1 className="text-shadow sticky top-0 w-full rounded-3xl border-[1px] border-gray-400 bg-[#fcf9f950] py-2 text-center text-xl font-bold capitalize text-[black]">
            {heading}
          </h1>
          <div className="flex h-screen w-full flex-wrap gap-5 px-5 pt-10 max-sm:px-10">
            {loading
              ? [1, 2, 3, 4, 5, 6].map(item => (
                <div
                  key={item}
                  className=" h-fit w-[15vw] animate-pulse rounded-b-2xl shadow-xl max-sm:w-full"
                >
                  <div className="h-52 bg-gray-300 max-sm:h-[37vh]"></div>
                  <div className="px-6 py-4">
                    <div className="mb-2 h-3 bg-gray-300"></div>
                    <div className="ml-[25%] h-2 w-1/2 bg-gray-300"></div>
                  </div>
                </div>
              ))
              : data?.map(({ id, title, name, image, language }) => (
                <div
                  key={id}
                  onClick={() => clickhandle(id)}
                  className="flex h-fit cursor-pointer flex-col items-center rounded-2xl shadow shadow-gray-600"
                >
                  <div className="aspect-square w-[15vw] max-sm:w-full">
                    <img
                      className="h-full w-full"
                      src={image?.at(-1)?.url}
                      alt={title}
                    />
                  </div>
                  <div
                    className={`w-full rounded-b-2xl bg-[#f7f4f477] text-sm font-bold text-[#333232] ${heading == 'playlists' ? 'py-3' : 'py-2'
                      } flex flex-col items-center justify-center`}
                  >
                    <p>
                      {title
                        ? title?.length > 20
                          ? title.substring(0, 20) + '...'
                          : title
                        : name?.length > 20
                          ? name.substring(0, 20) + '...'
                          : name}
                    </p>
                    <span className="text-gray-600">{language}</span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ADAlayout;
