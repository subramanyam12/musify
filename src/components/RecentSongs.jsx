import React, { useEffect, useState } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import Musicplayer from './Musicplayer'
import { contextvalue, setartistvalue } from '../Context'
import { RiHeartAddLine, RiHeartFill } from "react-icons/ri";
import { BiSolidTimeFive } from 'react-icons/bi'
import MusicAnime from './Musicanime'
import Download from './Download';

const RecentSongs = () => {
  const { song } = contextvalue()
  const setsong = setartistvalue()
  const [popular, setpopular] = useState([0, 1, 2])
  const [recentplaylistbool, setrecentplaylistbool] = useState(true)
  const [tempstore, settempstore] = useState([])
  const [loading, setloading] = useState(true)
  const [recentclose, setrecentclose] = useState(true)


  useEffect(() => {
    setTimeout(() => setloading(false), 1000)
    setpopular(song?.nestsearchdata?.length ? song?.nestsearchdata : localplaylist)
    song?.nestsearchdata?.length && localStorage.setItem('playlist', JSON.stringify(song?.nestsearchdata?.map(({ id, image, name, album, primaryArtists, downloadUrl }) => ({ id, image: typeof image === 'object' ? image?.at(-1)?.link : image, name, album: album?.primaryArtists, primaryArtists, downloadUrl: typeof downloadUrl === 'object' ? downloadUrl?.at(-1)?.link : downloadUrl }))))
    settempstore([])
  }, [song?.nestsearchdata])

  let localrecentlist = JSON.parse(localStorage.getItem('recentlist'))
  let localplaylist = JSON.parse(localStorage.getItem('playlist'))

  const recentclickhandle = (name) => {
    setpopular(!recentplaylistbool ? (song?.nestsearchdata?.length ? song?.nestsearchdata : localplaylist) : localrecentlist)
    setrecentplaylistbool(name === 'playlist')
  }

  const songclickhandle = (i) => {
    setsong(prev => recentplaylistbool ? ({ ...prev, index: i }) : { index: i, nestsearchdata: localrecentlist })
  }

  let favourlist = JSON.parse(localStorage.getItem('favourite'))

  const favourcheck = (index) => {
    let res = favourlist?.findIndex(({ id }) => id === index)
    return res !== undefined ? res !== -1 : false
  }


  const favouritehandle = (id, image, name, album, primaryArtists, downloadUrl) => {

    let song = { id, image: typeof image === 'object' ? image?.at(-1)?.link : image, name, album: album?.primaryArtists, primaryArtists, downloadUrl: typeof downloadUrl === 'object' ? downloadUrl?.at(-1)?.link : downloadUrl }
    if (!favourlist) {
      settempstore(id)
      localStorage.setItem('favourite', JSON.stringify([song]))
    } else {
      let index = favourlist?.findIndex((item) => item.id === id)
      if (index === -1) {
        settempstore(prev => [...prev, id])
        favourlist.unshift(song)
      } else {
        settempstore(prev => prev.filter(item => item !== id))
        favourlist.splice(index, 1)
      }
      localStorage.setItem('favourite', JSON.stringify(favourlist))
    }
  }

  return (
    <div className='w-[30vw] max-sm:w-full max-sm:z-10'>
      <div className={`mb-3 px-8 max-sm:px-4 max-sm:pt-3 ${recentclose && 'max-sm:hidden'} max-sm:absolute max-sm:w-full max-sm:-bottom-4 max-sm:left-0 max-sm:bg-[#000000] z-10`}>
        <div onClick={() => setrecentclose(true)} className='text-white hidden max-sm:block absolute top-2 left-2 text-2xl'><BiSolidTimeFive /></div>
        <div className='flex w-full py-5 text-white capitalize font-bold text-center'>
          <div onClick={() => recentclickhandle('playlist')} className={`w-[50%] cursor-pointer max-sm:cursor-default py-2 ${recentplaylistbool ? ' bg-gradient-to-t from-[#ffffff33] to-[#ffffff04] border-b-2 border-[#ffffffa8]' : 'border-b border-gray-400'} `}><span>current playlist</span></div>
          <div onClick={() => recentclickhandle('recent')} className={`w-[50%] cursor-pointer max-sm:cursor-default py-2 ${!recentplaylistbool ? 'bg-gradient-to-t from-[#ffffff33] to-[#ffffff04] border-b-2 border-[#ffffffa8]' : 'border-b border-gray-400'} `}><span>recent songs</span></div>
        </div>

        <>
          <div className='flex w-full h-[30vh]  max-sm:h-[35vh] flex-col gap-3 overflow-y-auto scroll-none'>
            {
              loading ? (
                <div className='mb-5'>
                  {
                    [1, 2, 3, 4]?.map((item) => (
                      <div key={item} className='flex w-full mb-2 gap-3 animate-pulse '>
                        <svg className="w-14 max-sm:w-[15vw] h-14 max-sm:h-[15vw] text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                        <div className='flex flex-col justify-center w-full'>
                          <div className="h-2 w-[60%] bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          <div className="h-2 w-1/3 bg-gray-200 rounded-full dark:bg-gray-700 mt-2.5"></div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  {popular?.length ? (
                    popular?.map(({ id, image, name, album, primaryArtists, downloadUrl }, i) => (
                      <div key={id} className={`${song?.index === i && recentplaylistbool && 'bg-[#ffffff21] rounded-xl'} py-1 group flex justify-between items-center cursor-pointer max-sm:cursor-default`}>
                        <div className='flex items-center'>
                          <div className='relative w-[3.5vw] max-sm:w-[15vw] ml-1 aspect-square rounded-xl  group-hover:before:absolute before:w-full before:h-full before:bg-[#00000086] before:rounded-xl'>
                            <div className='group-hover:visible invisible absolute z-10 left-1/2 t-1/2 -translate-x-1/2 translate-y-1 max-sm:scale-125 max-sm:translate-y-2 '><Download name={name} size="true" url={downloadUrl} /></div>
                            <img className='w-full h-full rounded-xl' src={typeof image === 'object' ? image?.at(-1)?.link : image} alt="song" />
                          </div>
                          <div className='font-semibold ml-3 text-sm'>
                            <p className='text-white'>{name?.length > 25 ? name?.substring(0, 25) + '...' : name}</p>
                            <span className='text-[#ffffff7e]'>{primaryArtists ? primaryArtists?.length > 25 ? primaryArtists?.substring(0, 25) + '...' : primaryArtists : album?.primaryArtists?.length > 25 ? album?.primaryArtists?.substring(0, 25) + '...' : album?.primaryArtists}</span>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span onClick={() => favouritehandle(id, image, name, album, primaryArtists, downloadUrl)} className='text-2xl duration-300 text-gray-200 group-hover:opacity-100 opacity-0'>{favourcheck(id) || tempstore.includes(id) ? <RiHeartFill /> : <RiHeartAddLine />}</span>
                          {song?.index === i && recentplaylistbool ? <div className='mr-4 scale-110'> <MusicAnime /></div> : <div onClick={() => songclickhandle(i)} className='bg-[#ffffff1f] border-[1px] border-[#ffffff5b] cursor-pointer max-sm:cursor-default text-white text-2xl rounded-2xl h-11 px-2 flex items-center'> <AiFillPlayCircle /></div>}
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className='text-white text-center capitalize font-semibold'>no songs playing...</div>
                  )}
                </>
              )}

          </div>
        </>

      </div>
      <Musicplayer setrecentclose={setrecentclose} />
    </div>

  )
}

export default RecentSongs
