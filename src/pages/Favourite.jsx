import React, { useState, useEffect } from 'react';
import { setartistvalue } from '../customhooks/Context';
import { IoCloseOutline } from 'react-icons/io5';
import Download from '../components/Download';

const Favourite = () => {
  const [favouritelist, setfavouritelist] = useState([]);
  const setsong = setartistvalue();

  let localfavourlist = JSON.parse(localStorage.getItem('favourite'));

  useEffect(() => {
    setfavouritelist(localfavourlist);
  }, []);

  const songclickhandle = index => {
    setsong({ index, nestsearchdata: favouritelist });
  };

  const removesong = index => {
    let newlist = favouritelist.filter(({ id }) => id !== index);
    setfavouritelist(newlist);
    localStorage.setItem('favourite', JSON.stringify(newlist));
  };

  return (
    <div className="scroll-none h-full w-full overflow-hidden rounded-3xl bg-[#ffffff23] pb-6 max-sm:pb-36">
      <h1 className="text-shadow sticky top-0 w-full rounded-3xl border-[1px] border-gray-400 bg-[#fcf9f950] py-2 text-center text-xl font-bold capitalize text-[black]">
        favourites
      </h1>
      {favouritelist?.length ? (
        <>
          <div className="scroll-none flex h-full w-full flex-col gap-5 overflow-y-auto py-10 pl-[10%] max-sm:pl-0">
            {favouritelist?.map(
              ({ id, image, name, album, primaryArtists, downloadUrl }, i) => (
                <div
                  key={id}
                  className="group flex w-[90%] cursor-pointer items-center justify-between max-sm:w-full max-sm:cursor-default max-sm:px-3"
                >
                  <div
                    onClick={() => songclickhandle(i)}
                    className="flex items-center gap-5 text-sm max-sm:gap-3"
                  >
                    <div className=" w-[4vw] rounded-xl bg-[#f7f7f7c5] max-sm:w-[15vw]">
                      <img
                        className="h-full w-full rounded-xl"
                        src={image}
                        alt={name}
                      />
                    </div>
                    <div className="font-semibold ">
                      <p className="text-white max-sm:hidden">
                        {name?.length > 50
                          ? name?.substring(0, 50) + '...'
                          : name}
                      </p>
                      <p className="hidden text-white max-sm:block">
                        {name?.length > 30
                          ? name?.substring(0, 25) + '...'
                          : name}
                      </p>
                      <span className="text-sm text-[#ffffff7e] max-sm:hidden">
                        {primaryArtists
                          ? primaryArtists?.length > 50
                            ? primaryArtists?.substring(0, 50) + '...'
                            : primaryArtists
                          : album?.primaryArtists?.length > 50
                            ? album?.primaryArtists?.substring(0, 50) + '...'
                            : album?.primaryArtists}
                      </span>
                      <span className="hidden text-sm text-[#ffffff7e] max-sm:block">
                        {primaryArtists
                          ? primaryArtists?.length > 30
                            ? primaryArtists?.substring(0, 30) + '...'
                            : primaryArtists
                          : album?.primaryArtists?.length > 33
                            ? album?.primaryArtists?.substring(0, 33) + '...'
                            : album?.primaryArtists}
                      </span>
                    </div>
                  </div>
                  <div className="invisible flex gap-4 duration-100 group-hover:visible max-sm:gap-2">
                    <Download url={downloadUrl} name={name} />
                    <abbr title="close">
                      <div
                        onClick={() => removesong(id)}
                        className="bg-red-10 p-1 text-3xl text-gray-200 max-sm:pr-0"
                      >
                        <IoCloseOutline />
                      </div>
                    </abbr>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <div className="mt-5 w-full text-center text-lg font-semibold capitalize text-white">
          no favourite songs...
        </div>
      )}
    </div>
  );
};

export default Favourite;
