import React, { useState, useRef, useEffect } from 'react';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
  IoShuffleOutline,
} from 'react-icons/io5';
import { BsRepeat, BsRepeat1, BsPauseFill } from 'react-icons/bs';
import { MdOutlineShuffle } from 'react-icons/md';
import { BiTimeFive } from 'react-icons/bi';
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from 'react-icons/io';

import { contextvalue, setartistvalue } from '../customhooks/Context';

const Musicplayer = ({ setrecentclose }) => {
  const [playbool, setplaybool] = useState(true);
  const [musicindex, setmusicindex] = useState(0);
  const [currentime, setcurrentime] = useState('00:00');
  const [durationtime, setdurationtime] = useState('00:00');
  const [widthupdate, setwidthupdate] = useState(0);
  const [repeatbool, setrepeatbool] = useState(false);
  const [shufflebool, setshufflebool] = useState(false);
  const [songlist, setsonglist] = useState([]);
  const { song } = contextvalue();
  const setsong = setartistvalue();
  const [imageclose, setimageclose] = useState(true);

  const audioplay = useRef(null);
  const musicanime = useRef();

  let localplaylist = JSON.parse(localStorage.getItem('playlist'));
  let localindex = JSON.parse(localStorage.getItem('currentindex'));

  useEffect(() => {
    setsonglist(
      song?.nestsearchdata?.length ? song?.nestsearchdata : localplaylist
    );
    !song?.nestsearchdata?.length && localindex && setmusicindex(localindex);
    song?.index !== musicindex && setmusicindex(song?.index);
    setwidthupdate(0);
    setTimeout(() => {
      audioplay.current?.play();
      setplaybool(audioplay.current?.paused);
    }, 0);
    const keydownhandle = e => {
      if (JSON.parse(sessionStorage.getItem('searchquery'))) return;
      if (e.code === 'Space') {
        playhandle();
      } else if (e.key === 'ArrowRight') {
        playforwardhandle();
      } else if (e.key === 'ArrowLeft') {
        playbackhandle();
      }
    };
    document.addEventListener('keydown', keydownhandle);

    return () => document.removeEventListener('keydown', keydownhandle);
  }, [song?.nestsearchdata, , song?.index]);

  useEffect(() => {
    song?.index !== musicindex &&
      setsong(prev => ({ ...prev, index: musicindex }));
    localStorage.setItem('currentindex', JSON.stringify(musicindex));
    addrecentlist();
  }, [musicindex]);

  let localrecentlist = JSON.parse(localStorage.getItem('recentlist'));
  const addrecentlist = () => {
    if (!songlist?.[musicindex]) return;
    const { id, image, name, artist, artists, downloadUrl } =
      songlist[musicindex];
    let storedata = {
      id,
      image: typeof image === 'object' ? image?.at(-1)?.url : image,
      name,
      artist: artist ? artist : artists?.primary?.[0]?.name,
      downloadUrl:
        typeof downloadUrl === 'object'
          ? downloadUrl?.at(-1)?.url
          : downloadUrl,
    };
    if (localrecentlist?.length) {
      let checkindex = localrecentlist.findIndex(item => item.id === id);
      checkindex !== -1 && localrecentlist.splice(checkindex, 1);
      localrecentlist.unshift(storedata);
      localrecentlist?.length > 10 && localrecentlist.pop();
      storedata = JSON.parse(JSON.stringify(localrecentlist));
    } else {
      storedata = [storedata];
    }
    localStorage.setItem('recentlist', JSON.stringify(storedata));
  };

  const playhandle = () => {
    if (audioplay.current.paused) {
      audioplay.current.play();
      setplaybool(false);
    } else {
      audioplay.current.pause();
      setplaybool(true);
    }
  };

  const playforwardhandle = () => {
    setwidthupdate(0);
    if (shufflebool) {
      let shuffleindex;
      do {
        shuffleindex = Math.floor(Math.random() * songlist.length);
      } while (shuffleindex === musicindex);
      setmusicindex(shuffleindex);
    } else {
      setmusicindex(musicindex === songlist.length - 1 ? 0 : musicindex + 1);
    }
    setTimeout(() =>
      playbool ? audioplay.current.pause() : audioplay.current.play()
    );
  };

  const playbackhandle = () => {
    setwidthupdate(0);
    if (shufflebool) {
      let shuffleindex;
      do {
        shuffleindex = Math.floor(Math.random() * songlist.length);
      } while (shuffleindex === musicindex);
      setmusicindex(shuffleindex);
    } else {
      setmusicindex(musicindex === 0 ? songlist.length - 1 : musicindex - 1);
    }
    setTimeout(() =>
      playbool ? audioplay.current.pause() : audioplay.current.play()
    );
  };

  const timecalc = time => {
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const timeupdatehandle = () => {
    setcurrentime(timecalc(audioplay.current.currentTime));
    let percentage =
      (audioplay.current.currentTime / audioplay.current.duration) * 100;
    setwidthupdate(percentage);
  };

  const durationupdate = () => {
    setdurationtime(timecalc(audioplay.current.duration));
  };

  const widthclickhandle = e => {
    let changewidth = e.nativeEvent.offsetX / e.target.offsetWidth;
    setwidthupdate(changewidth * 100);
    audioplay.current.currentTime = changewidth * audioplay.current.duration;
  };

  const audioendhandle = () => {
    if (repeatbool) {
      audioplay.current.currentTime = 0;
      audioplay.current.play();
    } else {
      playforwardhandle();
    }
  };

  return (
    <div
      className={` w-[25vw] duration-200 max-sm:absolute max-sm:bottom-0 max-sm:w-full  ${!imageclose ? 'max-sm:h-[40vh]' : ' max-sm:h-[15vh] '
        } imageclosetransitition mx-auto flex flex-col items-center gap-2 rounded-3xl bg-gradient-to-b from-[#1b5ca1] to-[#2e5f6e] px-[3vw] py-[2vw] shadow shadow-gray-500 max-sm:rounded-b-none max-sm:px-[6vw]`}
    >
      <div
        onClick={() => setimageclose(prev => !prev)}
        className="absolute -top-4 right-6 hidden text-4xl text-[#ffffff4b] max-sm:block"
      >
        {imageclose ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}
      </div>
      <div
        ref={musicanime}
        className={`w-[40%] ${imageclose && 'max-sm:hidden'
          } relative mb-5 mt-2 flex aspect-square items-center justify-center rounded-full bg-gray-400`}
      >
        <img
          className=" aspect-square rounded-full object-cover"
          src={
            typeof songlist?.[musicindex]?.image === 'object'
              ? songlist?.[musicindex]?.image?.at(-1)?.url
              : songlist?.[musicindex]?.image || 'musicphoto.jpg'
          }
          alt="image"
        />
      </div>

      <div className="text-center">
        <div
          onClick={() => setrecentclose(false)}
          className="absolute left-6 hidden text-2xl text-gray-400 max-sm:block"
        >
          <BiTimeFive />
        </div>
        <p className="line-clamp-1 font-bold text-white">
          {songlist?.[musicindex]?.name?.replaceAll('&quot;', '') || 'song'}
        </p>
        <span
          className={`line-clamp-1 text-gray-400 ${imageclose && 'max-sm:hidden'
            }`}
        >
          {songlist?.[musicindex]?.artist ? songlist?.[musicindex]?.artist : songlist?.[musicindex]?.artists?.primary?.[0]?.name || 'artist'}
        </span>
      </div>

      <div className="flex w-full items-center justify-between font-semibold text-gray-400">
        <small className="w-10 text-center">{currentime}</small>
        <div
          onClick={e => widthclickhandle(e)}
          className="relative h-1 w-[60%] cursor-pointer bg-gray-500 max-sm:cursor-default"
        >
          <div className=" absolute left-0 top-0 z-20 h-1 w-full cursor-pointer max-sm:cursor-default"></div>
          <div
            style={{
              width: `${widthupdate}%`,
              transition: 'width 100ms linear',
            }}
            className={`relative z-10 h-full bg-white before:absolute before:-right-[5px] before:-top-[3px] before:h-[10px] before:w-[10px] before:rounded-full before:bg-white`}
          ></div>
        </div>
        <small className="w-10 text-center duration-200">{durationtime}</small>
      </div>

      <div className="mt-5 flex w-full items-center justify-between text-2xl text-[#ffffffc7] max-sm:mt-1 max-sm:text-3xl">
        <span
          onClick={() => setrepeatbool(!repeatbool)}
          className="cursor-pointer max-sm:cursor-default"
        >
          {repeatbool ? <BsRepeat1 /> : <BsRepeat />}
        </span>
        <div className="flex items-center gap-3 text-3xl max-sm:text-4xl">
          <small
            onClick={playbackhandle}
            className="cursor-pointer max-sm:cursor-default"
          >
            <IoPlayBackSharp />
          </small>
          <div
            onClick={playhandle}
            className="flex cursor-pointer items-center justify-center rounded-xl bg-[#ffffffc7] p-[10px] text-xl text-gray-700 max-sm:cursor-default max-sm:text-2xl"
          >
            <audio
              ref={audioplay}
              onTimeUpdate={timeupdatehandle}
              onLoadedData={durationupdate}
              onEnded={audioendhandle}
              src={
                typeof songlist?.[musicindex]?.downloadUrl === 'object'
                  ? songlist?.[musicindex]?.downloadUrl?.at(-1)?.url
                  : songlist && songlist[musicindex]?.downloadUrl
              }
              hidden
            ></audio>
            {playbool ? <IoPlaySharp /> : <BsPauseFill />}
          </div>
          <small
            onClick={playforwardhandle}
            className="cursor-pointer max-sm:cursor-default"
          >
            <IoPlayForwardSharp />
          </small>
        </div>
        <span
          onClick={() => setshufflebool(!shufflebool)}
          className="cursor-pointer max-sm:cursor-default"
        >
          {shufflebool ? <MdOutlineShuffle /> : <IoShuffleOutline />}
        </span>
      </div>
    </div>
  );
};

export default Musicplayer;
