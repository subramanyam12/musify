import React, { useState,useEffect, memo } from 'react'
import { playlistfetch } from '../APIFetch'
import Nestsearchlayout from './Nestsearchlayout'


const ADAlayout = ({ heading, data }) => {
  const [nestsearchdata, setnestsearchdata] = useState([])
  const [bool, setbool] = useState(false)
  const [loading, setloading] = useState(true)
  
  useEffect(()=>{
     setTimeout(()=>setloading(false),1000)
  },[])

  const clickhandle = (type, id, url) => {
    setbool(true)
    let queryname = type === 'playlist' ? 'id' : 'link';
    let query = type === 'playlist' ? id : url
    playlistfetch(type, queryname, query)
      .then(res => {
        setnestsearchdata(type === 'playlist' || !Array.isArray(res?.data?.data) ? res?.data?.data?.songs : res?.data?.data);
        setloading(false)
       
      })
      .catch(err => console.log(err))

  }
  
  return (
    <div className=' bg-[#ffffff28] '>
      {bool ? (
        <Nestsearchlayout setbool={setbool} nestdata={nestsearchdata} />
      ) : (
        <>
          <h1 className='bg-[#fcf9f950] text-center border-gray-400 border-[1px] text-shadow sticky py-2 text-[black] w-full rounded-3xl capitalize top-0 font-bold text-xl'>{heading}</h1>
          <div className='flex flex-wrap gap-5 px-5 py-10 max-sm:pb-32 max-sm:px-10 w-full h-screen '>
            {
              loading ? (
                [1, 2, 3, 4, 5, 6].map(item => (
                  <div key={item} className=" w-[15vw] max-sm:w-full rounded-b-2xl shadow-xl animate-pulse">
                    <div className="h-48 max-sm:h-[37vh] bg-gray-300"></div>
                    <div className="px-6 py-4">
                      <div className="h-3 bg-gray-300 mb-2"></div>
                      <div className="h-2 bg-gray-300 w-2/3"></div>
                    </div>
                  </div>
                ))

              ) : (
                data?.map(({ id, title, name, image, language, type, url }) => (
                  <div key={id} onClick={() => clickhandle(type, id, url)} className='flex flex-col items-center shadow rounded-2xl shadow-gray-600 cursor-pointer'>
                    <div className='w-[15vw] max-sm:w-full aspect-square'>
                      <img className='w-full h-full' src={image?.at(-1)?.link} alt={title} />
                    </div>
                    <div className={`font-bold text-[#333232] bg-[#f7f4f477] w-full rounded-b-2xl text-sm ${heading == 'playlists' ? 'py-3' : 'py-2'} flex flex-col items-center justify-center`}>
                      <p>{title ? title?.length > 20 ? title.substring(0, 20) + '...' : title : name?.length > 20 ? name.substring(0, 20) + '...' : name}</p>
                      <span className='text-gray-600'>{language}</span>
                    </div>
                  </div>
                ))
              )}
          </div>
        </>
      )}
    </div>
  )
}

export default ADAlayout