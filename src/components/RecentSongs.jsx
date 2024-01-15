import React, { useEffect, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { BiSolidTimeFive } from 'react-icons/bi';
import { RiHeartAddLine, RiHeartFill } from 'react-icons/ri';

import { contextvalue, setartistvalue } from '../customhooks/Context';
import MusicAnime from './Musicanime';
import Musicplayer from './Musicplayer';
import Download from './Download';
import Playlistskeletion from '../loadingskeletons/Playlistskeletion';

const RecentSongs = () => {
  const { song } = contextvalue();
  const setsong = setartistvalue();
  const [popular, setpopular] = useState([0, 1, 2]);
  const [recentplaylistbool, setrecentplaylistbool] = useState(true);
  const [tempstore, settempstore] = useState([]);
  const [loading, setloading] = useState(true);
  const [recentclose, setrecentclose] = useState(true);

  useEffect(() => {
    setTimeout(() => setloading(false), 850);
    setpopular(
      song?.nestsearchdata?.length ? song?.nestsearchdata : localplaylist
    );
    song?.nestsearchdata?.length &&
      localStorage.setItem(
        'playlist',
        JSON.stringify(
          song?.nestsearchdata?.map(
            ({ id, image, name, album, primaryArtists, downloadUrl }) => ({
              id,
              image: typeof image === 'object' ? image?.at(-1)?.link : image,
              name,
              album: album?.primaryArtists,
              primaryArtists,
              downloadUrl:
                typeof downloadUrl === 'object'
                  ? downloadUrl?.at(-1)?.link
                  : downloadUrl,
            })
          )
        )
      );
    settempstore([]);
  }, [song?.nestsearchdata]);

  let localrecentlist = JSON.parse(localStorage.getItem('recentlist'));
  let localplaylist = JSON.parse(localStorage.getItem('playlist'));

  const recentclickhandle = name => {
    setpopular(
      !recentplaylistbool
        ? song?.nestsearchdata?.length
          ? song?.nestsearchdata
          : localplaylist
        : localrecentlist
    );
    setrecentplaylistbool(name === 'playlist');
  };

  const songclickhandle = i => {
    setsong(prev =>
      recentplaylistbool
        ? { ...prev, index: i }
        : { index: i, nestsearchdata: localrecentlist }
    );
  };

  let favourlist = JSON.parse(localStorage.getItem('favourite'));

  const favourcheck = index => {
    let res = favourlist?.findIndex(({ id }) => id === index);
    return res !== undefined ? res !== -1 : false;
  };

  const favouritehandle = (
    id,
    image,
    name,
    album,
    primaryArtists,
    downloadUrl
  ) => {
    let song = {
      id,
      image: typeof image === 'object' ? image?.at(-1)?.link : image,
      name,
      album: album?.primaryArtists,
      primaryArtists,
      downloadUrl:
        typeof downloadUrl === 'object'
          ? downloadUrl?.at(-1)?.link
          : downloadUrl,
    };
    if (!favourlist) {
      settempstore(id);
      localStorage.setItem('favourite', JSON.stringify([song]));
    } else {
      let index = favourlist?.findIndex(item => item.id === id);
      if (index === -1) {
        settempstore(prev => [...prev, id]);
        favourlist.unshift(song);
      } else {
        settempstore(prev => prev.filter(item => item !== id));
        favourlist.splice(index, 1);
      }
      localStorage.setItem('favourite', JSON.stringify(favourlist));
    }
  };

  return (
    <div className="w-[30vw] max-sm:z-10 max-sm:w-full">
      <div
        className={`mb-3 px-8 max-sm:px-4 max-sm:pt-3 ${
          recentclose && 'max-sm:hidden'
        } z-10 max-sm:absolute max-sm:-bottom-4 max-sm:left-0 max-sm:w-full max-sm:bg-[#000000]`}
      >
        <div
          onClick={() => setrecentclose(true)}
          className="absolute left-2 top-2 hidden text-2xl text-white max-sm:block"
        >
          <BiSolidTimeFive />
        </div>
        <div className="flex w-full py-5 text-center font-bold capitalize text-white">
          <div
            onClick={() => recentclickhandle('playlist')}
            className={`w-[50%] cursor-pointer py-2 max-sm:cursor-default ${
              recentplaylistbool
                ? ' border-b-2 border-[#ffffffa8] bg-gradient-to-t from-[#ffffff33] to-[#ffffff04]'
                : 'border-b border-gray-400'
            } `}
          >
            <span>current playlist</span>
          </div>
          <div
            onClick={() => recentclickhandle('recent')}
            className={`w-[50%] cursor-pointer py-2 max-sm:cursor-default ${
              !recentplaylistbool
                ? 'border-b-2 border-[#ffffffa8] bg-gradient-to-t from-[#ffffff33] to-[#ffffff04]'
                : 'border-b border-gray-400'
            } `}
          >
            <span>recent songs</span>
          </div>
        </div>

        <>
          <div className="scroll-none flex h-[30vh]  w-full flex-col gap-3 overflow-y-auto max-sm:h-[35vh]">
            {loading ? (
              <div className="mb-5">
                <Playlistskeletion />
              </div>
            ) : (
              <>
                {popular?.length ? (
                  popular?.map(
                    (
                      { id, image, name, album, primaryArtists, downloadUrl },
                      i
                    ) => (
                      <div
                        key={id}
                        className={`${
                          song?.index === i &&
                          recentplaylistbool &&
                          'rounded-xl bg-[#ffffff21]'
                        } group flex cursor-pointer items-center justify-between py-1 max-sm:cursor-default`}
                      >
                        <div className="flex items-center">
                          <div className="relative ml-1 aspect-square w-[3.5vw] rounded-xl before:h-full  before:w-full before:rounded-xl before:bg-[#00000086] group-hover:before:absolute max-sm:w-[15vw]">
                            <div className="t-1/2 invisible absolute left-1/2 z-10 -translate-x-1/2 translate-y-1 group-hover:visible max-sm:translate-y-2 max-sm:scale-125 ">
                              <Download
                                name={name}
                                size="true"
                                url={
                                  typeof downloadUrl === 'object'
                                    ? downloadUrl?.at(-1)?.link
                                    : downloadUrl
                                }
                              />
                            </div>
                            <img
                              className="h-full w-full rounded-xl"
                              src={
                                typeof image === 'object'
                                  ? image?.at(-1)?.link
                                  : image
                              }
                              alt="song"
                            />
                          </div>
                          <div className="ml-3 text-sm font-semibold">
                            <p className="text-white">
                              {name?.length > 25
                                ? name?.substring(0, 25) + '...'
                                : name}
                            </p>
                            <span className="text-[#ffffff7e]">
                              {primaryArtists
                                ? primaryArtists?.length > 25
                                  ? primaryArtists?.substring(0, 25) + '...'
                                  : primaryArtists
                                : album?.primaryArtists?.length > 25
                                  ? album?.primaryArtists?.substring(0, 25) +
                                    '...'
                                  : album?.primaryArtists}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            onClick={() =>
                              favouritehandle(
                                id,
                                image,
                                name,
                                album,
                                primaryArtists,
                                downloadUrl
                              )
                            }
                            className="text-2xl text-gray-200 opacity-0 duration-300 group-hover:opacity-100"
                          >
                            {favourcheck(id) || tempstore.includes(id) ? (
                              <RiHeartFill />
                            ) : (
                              <RiHeartAddLine />
                            )}
                          </span>
                          {song?.index === i && recentplaylistbool ? (
                            <div className="mr-4 scale-110">
                              {' '}
                              <MusicAnime />
                            </div>
                          ) : (
                            <div
                              onClick={() => songclickhandle(i)}
                              className="flex h-11 cursor-pointer items-center rounded-2xl border-[1px] border-[#ffffff5b] bg-[#ffffff1f] px-2 text-2xl text-white max-sm:cursor-default"
                            >
                              {' '}
                              <AiFillPlayCircle />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-center font-semibold capitalize text-white">
                    no songs playing...
                  </div>
                )}
              </>
            )}
          </div>
        </>
      </div>
      <Musicplayer setrecentclose={setrecentclose} />
    </div>
  );
};

export default RecentSongs;
