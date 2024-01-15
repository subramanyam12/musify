import React, { useEffect, useState } from 'react';
import { GoHomeFill, GoHome } from 'react-icons/go';
import { BiCompass, BiSolidCompass } from 'react-icons/bi';
import {
  IoAlbumsOutline,
  IoAlbums,
  IoHeartHalfSharp,
  IoHeartSharp,
  IoClose,
} from 'react-icons/io5';
import { PiPlaylistBold, PiPlaylistDuotone } from 'react-icons/pi';
import { HiMenuAlt3 } from 'react-icons/hi';

import { Link } from 'react-router-dom';
import { contextvalue } from '../customhooks/Context';
import { fetchhomepage } from '../customhooks/APIFetch';

const MENU = [
  [GoHome, GoHomeFill, 'home'],
  [BiCompass, BiSolidCompass, 'discover'],
  [IoAlbumsOutline, IoAlbums, 'albums'],
  [PiPlaylistDuotone, PiPlaylistBold, 'playlists'],
  [IoHeartHalfSharp, IoHeartSharp, 'favourites'],
];
let MENU_INDEX = MENU.findIndex(
  index => window.location.hash.split('/')[1] === index[2]
);

const Navbar = () => {
  const [menuitem, setmenuitem] = useState(
    MENU[MENU_INDEX === -1 ? 0 : MENU_INDEX][2]
  );
  const [close, setclose] = useState(false);
  const { sethomedata } = contextvalue();
  useEffect(() => {
    fetchhomepage()
      .then(res => sethomedata(res.data?.data))
      .catch(err => console.log(err));
  }, []);

  const handlemenuclick = name => {
    setmenuitem(name);
    setclose(false);
  };

  return (
    <>
      <div
        onClick={() => setclose(prev => !prev)}
        className="absolute right-5 top-4 z-30 hidden text-3xl text-gray-800 max-sm:block max-sm:p-1"
      >
        {close ? (
          <IoClose className="relativ -mt-2 text-gray-400" />
        ) : (
          <HiMenuAlt3 />
        )}
      </div>
      <div
        className={`h-full w-[17vw] overflow-hidden max-sm:z-20 max-sm:h-fit max-sm:w-[50%] max-sm:pb-5 max-sm:pt-12 ${
          !close && 'max-sm:hidden'
        } flex flex-col items-center gap-8 bg-gradient-to-r from-[#00000057] to-[#0000002a] pt-5 max-sm:absolute max-sm:right-0 max-sm:rounded-bl-3xl max-sm:from-[#0000009a] max-sm:to-[#0000008a]`}
      >
        <div className="flex flex-col items-center gap-1 max-sm:hidden">
          <div className="flex aspect-square w-[5vw] items-center justify-center rounded-full bg-[#ffffff60]">
            <img
              className="mr-[1px] mt-[1px] aspect-square w-[80%] object-cover"
              src="hiuser.png"
              alt="logo"
            />
          </div>
          <h1 className="text-xl font-bold text-white">welcome</h1>
        </div>

        <div className="max-md:pl-l flex w-full  flex-col pl-[3vw] max-sm:pl-0">
          <div className="item-center flex w-full flex-col gap-1 capitalize">
            {MENU.map(([Icon, Fill, name], i) => (
              <Link
                key={i}
                to={name === 'home' ? '/' : name}
                onClick={() => handlemenuclick(name)}
                className={`relative flex w-full items-center gap-3 py-2 text-[#afaeae] duration-300 max-sm:cursor-default ${
                  menuitem == name
                    ? 'rounded-l-lg bg-[#ffffff11] pl-5 font-bold text-white before:absolute before:right-0 before:h-full before:w-[5px] before:rounded-xl before:bg-[#ffffff56] max-sm:rounded-l-none max-sm:bg-[#ffffff28] max-sm:before:left-0'
                    : 'font-semibold max-sm:pl-10'
                }`}
              >
                <span className="text-xl">
                  {menuitem === name ? <Fill /> : <Icon />}
                </span>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
