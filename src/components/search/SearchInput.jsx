import React from 'react';
import { TbMusicSearch } from 'react-icons/tb';

const SearchInput = ({ searchquery, setsearchquery, onchangehandle }) => {
  const handleemptysearchquery = () => {
    setsearchquery('');
    sessionStorage.removeItem('searchquery');
  };
  return (
    <div className="flex items-center justify-between font-bold text-white">
      <img
        className="w-40 max-sm:ml-2 max-sm:w-32 "
        src="Musifylogo.png"
        alt="musify"
      />

      <div className="relative max-sm:absolute max-sm:right-[3vw] max-sm:top-16">
        <div
          onClick={handleemptysearchquery}
          className={`absolute ${
            !searchquery && 'invisible'
          } right-2 top-[5px] z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-[#ffffff38] max-sm:cursor-default`}
        >
          <span className="h-4 w-[2px] rotate-45 rounded-sm bg-[#c0bebe9d] before:absolute before:h-4 before:w-[2px] before:rotate-90 before:rounded-sm before:bg-[#c0bebe9d]"></span>
        </div>
        <label className=" z-30 flex items-center gap-5 max-sm:w-full">
          <input
            type="text"
            onInput={e => onchangehandle(e.target.value)}
            value={searchquery}
            className="w-[33vw] rounded-3xl border-[1px] border-[#ffffff5b] bg-[#ffffff17] py-2 pl-12 pr-5 shadow-inner shadow-[#a3a0a088] outline-none placeholder:text-[#ffffff5e]  max-sm:w-[90vw]"
            placeholder="search for songs and artists..."
          />
          <span className="absolute left-0 top-0 ml-2 cursor-pointer rounded-xl p-2 text-2xl opacity-70 max-sm:cursor-default">
            <TbMusicSearch />
          </span>
        </label>
      </div>
    </div>
  );
};

export default SearchInput;
