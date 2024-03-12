import React, { useState, useEffect } from 'react';

import { setartistvalue } from '../../customhooks/Context';
import Download from '../Download';

const Nestsearchlayout = ({ setbool, nestdata }) => {
  const [nestsearchdata, setnestsearchdata] = useState([]);
  const [loading, setloading] = useState(true);
  const setsong = setartistvalue();

  useEffect(() => {
    window.screenTop = 0;
    setTimeout(() => setloading(false), 1000);
    if (nestdata?.length) {
      const replacelist = ['&quot;', '&amp;', '&#039;', '&', ';'];
      setnestsearchdata(
        nestdata.map(item => {
          replacelist.forEach(keyword => {
            item.name = item.name.replaceAll(keyword, '');
          });
          return item;
        })
      );
    }
  }, [nestdata]);

  const songclickhandle = index => {
    setsong({ index, nestsearchdata });
  };

  const close = () => {
    setbool && setbool(false);
    setnestsearchdata([]);
  };

  return (
    <div className="overflow-hidde absolute left-0 top-0 z-10 h-[120%] w-full rounded-3xl bg-gradient-to-r from-[#026e70] to-[#005e78] pb-5 max-sm:pb-40">
      <div className=" absolute flex w-full items-center justify-center bg-gradient-to-r from-[#026e70] to-[#005e78] p-3">
        <span className="text-shadow text-xl font-bold capitalize text-white">
          Songs
        </span>
        <div
          onClick={close}
          className=" relative left-[40%] z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full duration-200 hover:bg-[#ffffff38] max-sm:left-[35%]"
        >
          <div className="h-6 w-[2px] rotate-45 rounded-sm bg-[#c0bebe9d] before:absolute before:h-6 before:w-[2px] before:rotate-90 before:rounded-sm before:bg-[#c0bebe9d]"></div>
        </div>
      </div>
      <div
        className={`flex h-full w-full flex-col ${loading ? 'items-center' : 'px-[10%] max-sm:px-3 '
          } scroll-none gap-5 overflow-y-auto pb-5 pt-20`}
      >
        {loading ? (
          <div className="mt-5 h-10 w-10 animate-spin rounded-full border-b-4 border-t-4 border-b-gray-800 border-t-gray-800 "></div>
        ) : (
          nestsearchdata?.map(
            (
              { id, image, name, artists, language, downloadUrl },
              i
            ) => (
              <div
                key={id}
                className="group flex cursor-pointer items-center justify-between max-sm:cursor-default"
              >
                <div
                  onClick={() => songclickhandle(i)}
                  className="flex w-full items-center"
                >
                  <div className=" w-[5vw] rounded-xl bg-[#f7f7f7c5] max-sm:w-[15vw]">
                    <img
                      className="h-full w-full rounded-xl"
                      src={image?.at(-1)?.url}
                      alt={name}
                    />
                  </div>
                  <div className="ml-6 font-semibold max-sm:ml-4 max-sm:text-sm">
                    <p className="text-white max-sm:hidden">
                      {name?.length > 60
                        ? name?.substring(0, 60) + '...'
                        : name}
                    </p>
                    <p className="hidden text-white max-sm:block">
                      {name?.length > 33 ? name.substring(0, 33) + '...' : name}
                    </p>
                    <div className="flex flex-col text-sm max-sm:text-[13px]">
                      <p className="text-[#ffffff7e] max-sm:hidden">
                        {artists
                          && artists?.primary?.[0]?.name?.length > 60
                          ? artists?.primary?.[0]?.name?.substring(0, 60) + '...'
                          : artists?.primary?.[0]?.name
                        }
                      </p>
                      <p className="hidden text-[#ffffff7e] max-sm:block">
                        {artists
                          && artists?.primary?.[0]?.name?.length > 33
                          ? artists?.primary?.[0]?.name?.substring(0, 33) + '...'
                          : artists?.primary?.[0]?.name
                        }
                      </p>
                      <span className=" text-[#ffffffb9]">{language}</span>
                    </div>
                  </div>
                </div>
                <div className=" invisible group-hover:visible">
                  <Download url={downloadUrl?.at(-1)?.url} name={name} />
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Nestsearchlayout;
