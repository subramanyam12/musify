import React, { useState, useEffect } from 'react'
import { APIFetch } from '../APIFetch'
import { setartistvalue } from '../Context'

const Artists = () => {
  const [artists, setartists] = useState([{ id: Math.random().toString(32).substring(2), name: '', images: '' }])
  const [loading, setloading] = useState(true)
  const setsong  = setartistvalue()



  useEffect(() => {
   
    APIFetch('artists', 'top artists')
    .then(res =>{
      setartists(res.data.data.results)
      setTimeout(() => setloading(false), 500);
      })
      .catch(err => console.log(err))
  }, [])


  const artistclickhandle = (name) => {
    APIFetch('songs', name)
      .then(res => setsong({ index: 0, nestsearchdata: res?.data?.data?.results }))
      .catch(err => console.log(err))
  }

  return (
    <div>
          <div className='w-full'>
            <h1 className='font-bold text-lg mb-3 capitalize text-white'>top artists</h1>
            <div className='flex gap-5 overflow-x-auto scroll-none w-full h-[11vw] max-sm:h-[35vw]'>
              {
                loading ? (
                  [1, 2,3,4,5,6]?.map((item) => (
                    <div key={item} className='relative flex mb-2 gap-3 animate-pulse '>
                      <svg className=" w-[11vw] max-sm:w-[35vw] aspect-square text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                      <div className='flex justify-center items-center rounded-b-2xl bg-gray-600 absolute left-0 bottom-0 w-full h-1/4'>
                        <div className="h-2 w-1/2 -translate-x-1/ bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </div>
                  ))
                  ):(
                  artists.map(({ id, name, image }) => (
                    <div key={id} onClick={() => artistclickhandle(name)} className=' relative w-[13vw] max-sm:w-[35vw] aspect-square rounded-3xl shadow bg-[#ffffff1a] cursor-pointer max-sm:cursor-default'>
                      <img src={image?.at(-1)?.link} alt={name} className='w-full h-full rounded-3xl' />
                      <div style={{WebkitBackdropFilter:'blur(16px)'}} className='bg-[#1d1c1c15] text-white text-sm max-sm:text-xs backdrop-blur-lg font-semibold rounded-b-3xl  absolute bottom-0 text-center p-2 w-full '>{name.length > 15 ? name.substring(0, 15) + '...' : name}</div>
                    </div>
                  ))
                )
              }
            </div>
          </div>

    </div>
  )
}

export default Artists