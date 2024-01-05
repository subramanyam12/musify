import React, { useState, useEffect } from 'react'
import { setartistvalue } from '../Context'
import { IoCloseOutline } from "react-icons/io5";
import Download from './Download';


const Favourite = () => {
  const [favouritelist, setfavouritelist] = useState([])
  const setsong = setartistvalue()

  let localfavourlist = JSON.parse(localStorage.getItem('favourite'))

  useEffect(() => {
    setfavouritelist(localfavourlist)
  }, [])

  const songclickhandle = (index) => {
    setsong({ index, nestsearchdata: favouritelist })
  }

  const removesong = (index) => {
    let newlist = favouritelist.filter(({ id }) => id !== index)
    setfavouritelist(newlist)
    localStorage.setItem('favourite', JSON.stringify(newlist))
  }

  return (

    <div className='w-full h-full overflow-hidden scroll-none pb-6 max-sm:pb-36 bg-[#ffffff23] rounded-3xl'>
      <h1 className='bg-[#fcf9f950] text-center border-gray-400 border-[1px] text-shadow sticky py-2 text-[black] w-full rounded-3xl capitalize top-0 font-bold text-xl'>favourites</h1>
      {
        favouritelist?.length ? (
          <>
            <div className='flex w-full h-full flex-col pl-[10%] max-sm:pl-0 gap-5 py-10 overflow-y-auto scroll-none'>
              {
                favouritelist?.map(({ id, image, name, album, primaryArtists,downloadUrl }, i) => (
                  <div key={id} className='flex w-[90%] max-sm:w-full group items-center justify-between cursor-pointer max-sm:cursor-default max-sm:px-3'>
                    <div onClick={() => songclickhandle(i)} className='flex gap-5 max-sm:gap-3 items-center text-sm'>
                      <div className=' w-[4vw] max-sm:w-[15vw] bg-[#f7f7f7c5] rounded-xl'><img className='w-full h-full rounded-xl' src={image} alt={name} /></div>
                      <div className='font-semibold '>
                        <p className='text-white max-sm:hidden'>{name?.length > 50 ? name?.substring(0, 50) + '...' : name}</p>
                        <p className='text-white hidden max-sm:block'>{name?.length > 30 ? name?.substring(0, 25) + '...' : name}</p>
                        <span className='text-[#ffffff7e] max-sm:hidden text-sm'>{primaryArtists ? primaryArtists?.length > 50 ? primaryArtists?.substring(0, 50) + '...' : primaryArtists : album?.primaryArtists?.length > 50 ? album?.primaryArtists?.substring(0, 50) + '...' : album?.primaryArtists}</span>
                        <span className='text-[#ffffff7e] hidden max-sm:block text-sm'>{primaryArtists ? primaryArtists?.length > 30 ? primaryArtists?.substring(0, 30) + '...' : primaryArtists : album?.primaryArtists?.length > 33 ? album?.primaryArtists?.substring(0, 33) + '...' : album?.primaryArtists}</span>

                      </div>
                    </div>
                    <div className='flex gap-4 max-sm:gap-2 group-hover:visible invisible duration-100'>
                      <Download url={downloadUrl} name={name} />
                      <abbr title="close"><div onClick={() => removesong(id)} className='text-gray-200 p-1 max-sm:pr-0 bg-red-10 text-3xl'><IoCloseOutline /></div></abbr>
                    </div>
                  </div>
                ))
              }
            </div>

          </>
        ) : (
          <div className='font-semibold text-lg text-white mt-5 w-full text-center capitalize'>no favourite songs...</div>
        )
      }
    </div>
  )
}

export default Favourite