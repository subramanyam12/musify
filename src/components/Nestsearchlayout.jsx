import React, { useState, useEffect } from 'react'
import { setartistvalue } from '../Context'


const Nestsearchlayout = ({ setbool, nestdata }) => {

  const [nestsearchdata, setnestsearchdata] = useState([])
  const [loading, setloading] = useState(true)
  const  setsong  = setartistvalue()
  useEffect(() => {
    setTimeout(()=>setloading(false),1000)
    nestdata?.length && setnestsearchdata(nestdata)
  }, [nestdata])

  const songclickhandle = (index) => {
    setsong({ index, nestsearchdata })
  }

  const close = () => {
    setbool && setbool(false)
    setnestsearchdata([])

  }
  
  return (
    <div className={`absolute ${!nestsearchdata?.length && 'hidden'} max-sm:pb-28 top-0 left-0 z-10 w-full h-[120%] overflow-hidden scroll-none bg-gradient-to-r from-[#026e70] to-[#005e78] rounded-3xl`}>
      <div className=' flex justify-center items-center p-3 absolute w-full bg-gradient-to-r from-[#026e70] to-[#005e78]'>
        <span className='font-bold text-xl capitalize text-shadow text-white'>Songs</span>
        <div onClick={close}  className=' w-8 h-8 rounded-full flex justify-center items-center relative left-[40%] max-sm:left-[35%] z-30 cursor-pointer'>
          <div className='w-[3px] h-6 rotate-45 rounded-sm before:rounded-sm before:absolute before:w-[3px] before:h-6 before:rotate-90 before:bg-[#c0bebe9d] bg-[#c0bebe9d]'></div>
        </div>
      </div>
      <div className={`flex w-full h-full flex-col ${loading ? 'items-center': 'pl-[10%] max-sm:pl-0'} gap-5 pt-20 pb-5 overflow-y-auto scroll-none`}>
        {
          loading ? (
            <div className='w-10 h-10 mt-5 border-b-gray-800 border-b-4 border-t-4 border-t-gray-800 animate-spin rounded-full '></div>
          ) : (
            nestsearchdata?.map(({ id, image, name, album, primaryArtists, language }, i) => (
              <div key={id} onClick={() => songclickhandle(i)} className='flex items-center cursor-pointer max-sm:cursor-default px-5'>
                <div className=' w-[5vw] max-sm:w-[15vw] bg-[#f7f7f7c5] rounded-xl'><img className='w-full h-full rounded-xl' src={image?.at(-1)?.link} alt={name} /></div>
                <div className='font-semibold max-sm:text-sm ml-6 max-sm:ml-4'>
                  <p className='text-white max-sm:hidden'>{name?.length > 60 ? name?.substring(0, 60) + '...' : name}</p>
                  <p className='text-white max-sm:block hidden'>{name?.length > 33 ? name.substring(0, 33) + '...' : name}</p>
                  <div className='flex flex-col text-sm max-sm:text-[13px]'>
                    <p className='text-[#ffffff7e] max-sm:hidden'>{primaryArtists ? primaryArtists?.length > 60 ? primaryArtists?.substring(0, 60) + '...' : primaryArtists : album?.primaryArtists?.length > 60 ? album?.primaryArtists?.substring(0, 60) + '...' : album?.primaryArtists}</p>
                    <p className='text-[#ffffff7e] max-sm:block hidden'>{primaryArtists ? primaryArtists?.length > 33 ? primaryArtists?.substring(0, 33) + '...' : primaryArtists : album?.primaryArtists?.length > 60 ? album?.primaryArtists?.substring(0, 60) + '...' : album?.primaryArtists}</p>
                    <span className=' text-[#ffffffb9]'>{language}</span>
                  </div>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  )
}

export default Nestsearchlayout