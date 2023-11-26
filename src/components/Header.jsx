import React, { useState, useEffect } from 'react'
import { TbMusicSearch } from 'react-icons/tb'
import { AiFillPlayCircle } from 'react-icons/ai'
import Artists from './Artists'
import { APIFetch, playlistfetch } from '../APIFetch'
import { setartistvalue } from '../Context'
import { Routes, Route} from 'react-router-dom'
import Albums from './Albums'
import Discover from './Discover'
import Artistpage from './Artistpage'
import Nestsearchlayout from './Nestsearchlayout'
import Favourite from './Favourite'
import useDebounce from './UseDebounce'


const Header = () => {
   const [searchquery, setsearchquery] = useState('')
   const [searchdata, setsearchdata] = useState({})
   const [error, seterror] = useState(false)
   const [nestsearchdata, setnestsearchdata] = useState([])
   const [trending, settrending] = useState([])
   const setsong = setartistvalue()
   const [bool, setbool] = useState(false)
   const [loading, setloading] = useState(true)
   const debouncevalue = useDebounce(searchquery)
   const [searchloading, setsearchloading] = useState(true)
   let sessionsearchquery = JSON.parse(sessionStorage.getItem('searchquery'))


   useEffect(() => {

      if (sessionsearchquery) {
         setsearchquery(sessionsearchquery)
         fetchsearch(sessionsearchquery)
      }
      APIFetch('playlists', 'trending', 10)
         .then(res => {
            setTimeout(() => setloading(false), 700)
            settrending(res.data?.data?.results)
         })
         .catch(err => console.log(err))
   }, [])




   const trendingclickhandle = (id) => {
      playlistfetch('playlist', 'id', id)
         .then(res => setsong({ index: 0, nestsearchdata: res.data?.data?.songs }))
         .catch(err => console.log(err))
   }


   const fetchsearch = async (value) => {
      if (!value) return
      APIFetch('all', value)
         .then(res => {
            let data = res.data.data
            setsearchdata(res.data.data)
            setsearchloading(false)
            let testbool = true
            for (let i in data) {
               if (data[i]?.results.length) {
                  testbool = false
               }
            }

            seterror(testbool)
         })
         .catch(err => {
            seterror(true)
            setsearchdata({})
         })
   }


   useEffect(() => {
      searchquery && fetchsearch(debouncevalue)
   }, [debouncevalue])

   const onchangehandle = (value) => {
      setsearchquery(value)
      sessionStorage.setItem('searchquery', JSON.stringify(value))
      if (value) {
         setsearchloading(true)
      } else {
         setsearchdata({})
         setnestsearchdata([])
         setbool(false)
         seterror(false)
         sessionStorage.removeItem('searchquery')
      }
   }

  

   const clickhandle = (type, title, id, url) => {
      setbool(true)
      const replacelist = ["&quot;",'&amp;','(',')','&',';']
      replacelist.forEach((item)=>{
         title=title.replaceAll(item,'')
      })
   
      if (type === 'playlist' || type === 'album') {
         playlistfetch(type, type === 'playlist' ? 'id' : 'link', type === 'playlist' ? id : url)
            .then(res => {
               setnestsearchdata(res?.data?.data?.songs);
            })
            .catch(err => console.log(err))
      } else {
         APIFetch('songs', title, 30)
            .then(res => {
               setnestsearchdata(res.data?.data?.results);
            })
            .catch(err => console.log(err))
      }
   }


   const Searchbox = ({ name, data }) => {

      return (
         <div className='w-[50%] max-sm:w-full'>
            <h1 className='font-bold text-lg m-4 capitalize text-shadow text-white'>{name}</h1>
            <div className='flex flex-col gap-3 h-[13vw] max-sm:h-[23vh] overflow-y-auto scroll-none'>
               {
                  data?.map(({ id, image, title, type, url }) => (
                     <div key={id} onClick={() => clickhandle(type, title, id, url)} className='flex items-center cursor-pointer max-sm:cursor-default px-5'>
                        <div className=' w-[3.5vw] max-sm:w-[14vw]'><img className='w-full h-full' src={image?.at(-1)?.link} alt={title} /></div>
                        <div className='font-semibold text-[12.5px] max-sm:text-sm ml-4'>
                           <p className='text-white max-sm:hidden '>{title?.length > 25 ? title.substring(0, 25) + '...' : title}</p>
                           <p className='text-white max-sm:block hidden'>{title?.length > 33 ? title.substring(0, 33) + '...' : title}</p>
                           <span className='text-[#ffffff7e] '>{type?.length > 25 ? type.substring(0, 25) + '...' : type}</span>
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
      )


   }

   const Laodingsearch = () => {
      return (
         <>
            <div className='flex w-full max-sm:hidden flex-col gap-3 h-[10vw]'>
               <h1 className='font-bold text-lg m-4 capitalize text-shadow text-white'>Top search</h1>
               <div className='flex items-center cursor-pointer px-5'>
                  <div className=' w-[5vw] rounded-xl aspect-square bg-gray-400'></div>
                  <div className='ml-4'>
                     <p className=' w-36 bg-gray-400 h-[12.5px] mb-2'></p>
                     <div className='w-20 bg-gray-400 h-[12.5px]'></div>
                  </div>
               </div>

            </div>

            {
               ['songs', 'albums', 'artists', 'playlists'].map((item, id) => (
                  <div key={id} className='w-[50%] animate-pulse max-sm:w-full'>
                     <h1 className='font-bold text-lg m-4 capitalize text-shadow text-white'>{item}</h1>
                     <div className='flex flex-col gap-3 h-[13vw] max-sm:h-[23vh] overflow-y-auto scroll-none'>
                        {
                           [1, 2, 3]?.map((id) => (
                              <div key={id} className='flex items-center cursor-pointer px-5'>
                                 <div className=' w-[3.5vw] aspect-square max-sm:w-[14vw] bg-gray-400'></div>
                                 <div className='ml-4'>
                                    <p className=' w-36 bg-gray-400 h-[12.5px] max-sm:h-[14px] mb-2'></p>
                                    <div className='w-20 bg-gray-400 h-[12.5px] max-sm:h-[14px]'></div>
                                 </div>
                              </div>
                           ))
                        }
                     </div>
                  </div>
               ))}
         </>

      )
   }



   const Introduction = () => {
      return (

         <div className='flex flex-col h-full max-sm:pt-4  max-sm:gap-4 justify-around max-sm:justify-start'>
            <div style={{ scrollSnapType: 'x mandatory' }} className='w-full flex h-[23vw] max-sm:h-[33vh] py-2 overflow-y-auto scroll-none rounded-3xl  shadow-lg'> {/*bg-[#ffffff1c]*/}
               <div className='flex gap-3 h-full' >
                  {
                     loading ? (
                        [1, 2, 3]?.map((item) => (
                           <div key={item} className='relative flex gap-3 animate-pulse '>
                              <div className='aspect-[1.5/1] rounded-3xl shadow bg-gray-400 '>
                                 <div className='absolute duration-300 bottom-0 left-0 flex flex-col pt-20 items-center justify-center bg-[#000000a2] text-[#ffffffb7] text-center rounded-3xl font-semibold w-full h-full'>
                                    <AiFillPlayCircle className='text-5xl opacity-40 mb-3 cursor-pointer max-sm:cursor-default text-gray-50 bg-gray-400 rounded-full' />
                                    <div className='w-36 max-sm:w-32 h-4 rounded-full bg-gray-500 text-xl'></div><br />
                                    <p className='w-20 max-sm:w-16 h-3 -mt-3 rounded-full bg-gray-500 text-xl'></p>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        trending.map(({ id, name, image, language }) => (
                           <div key={id} style={{ scrollSnapAlign: 'center' }} className='relative group aspect-[1.5/1] rounded-3xl shadow bg-[#ffffff1a]'>
                              <img src={image?.at(-1)?.link} alt={name} className='w-full h-full object-cove rounded-3xl' />
                              <div className='absolute group-hover:opacity-100 opacity-0 duration-300 bottom-0 left-0 flex flex-col pt-20 items-center justify-center bg-[#000000a2] text-[#ffffffb7] text-center rounded-3xl font-semibold w-full h-full'>
                                 <AiFillPlayCircle onClick={() => trendingclickhandle(id)} className='text-5xl mb-3 cursor-pointer max-sm:cursor-default text-[#0000ffaf] transition bg-gray-300 rounded-full' />
                                 <p><span className='font-bold text-white text-xl'>{name}</span><br />{language} </p>
                              </div>
                           </div>
                        ))
                     )}
               </div>
            </div>

            <Artists />

         </div>


      )

   }


   return (

      <div className=' w-[53vw] max-sm:w-full max-sm:h-full relative pl-7 max-sm:px-2 pt-7 max-sm:pt-4 pb-2 flex flex-col gap-5'>

         <div className='flex justify-between items-center text-white font-bold'>

            <img className='w-40 max-sm:w-32 max-sm:ml-2' src='Musifylogo.png' alt="musify" />

            <label className='flex relative max-sm:absolute max-sm:top-16 max-sm:left-[5vw] max-sm:w-full items-center gap-5'>
               <input type="search" onChange={(e) => onchangehandle(e.target.value)} value={searchquery} className='bg-[#ffffff17] w-[33vw] max-sm:w-[90vw] border-[1px] border-[#ffffff5b] placeholder:text-[#ffffff5e] rounded-3xl py-2 pl-12 pr-5 shadow-inner shadow-[#a3a0a088]  outline-none' placeholder='search for songs and artists...' />
               <span className='absolute left-0 top-0 ml-2 cursor-pointer text-2xl rounded-xl p-2'><TbMusicSearch /></span>
            </label>
         </div>


         <div className='w-full max-sm:mt-16 h-full relative overflow-hidden rounded-3xl'>

            {bool ? <Nestsearchlayout setbool={setbool} nestdata={nestsearchdata} /> : null}

            {searchquery.trim() ? (

               <div className='flex flex-wrap max-sm:flex-nowrap max-sm:flex-col w-full h-full max-sm:h-[80vh] max-sm:pb-40 overflow-y-auto scroll-none bg-gradient-to-r from-[#026e707e] to-[#005e7867] shadow rounded-3xl'>
                  {
                     searchloading ? (
                        <Laodingsearch />
                     ) : (
                        <>
                           {
                              searchdata?.topQuery?.results?.length ? (

                                 <div className='flex w-full max-sm:hidden flex-col gap-3 h-[10vw] overflow-y-auto scroll-none'>
                                    <h1 className='font-bold text-lg m-4 capitalize text-shadow text-white'>Top search</h1>

                                    {
                                       searchdata?.topQuery?.results?.map(({ id, image, title, type, url }) => (
                                          <div key={id} onClick={() => clickhandle(type, title, id, url)} className='flex items-center cursor-pointer px-5'>
                                             <div className=' w-[5vw] max-sm:w-[15vw] bg-[#f7f7f7c5] rounded-xl'><img className='w-full h-full rounded-xl' src={image?.at(-1)?.link} alt={title} /></div>
                                             <div className='font-semibold  ml-6 max-sm:text-sm'>
                                                <p className='text-white max-sm:hidden'>{title}</p>
                                                <p className='text-white max-sm:block hidden'>{title?.length > 33 ? title.substring(0, 33) + '...' : title}</p>
                                                <span className='text-[#ffffff7e] '>{type}</span>
                                             </div>

                                          </div>
                                       ))
                                    }
                                 </div>

                              ) : null}
                           {searchdata?.songs?.results?.length ? <Searchbox name={'songs'} data={searchdata?.songs?.results} /> : null}
                           {searchdata?.albums?.results?.length ? <Searchbox name={'album'} data={searchdata?.albums?.results} /> : null}
                           {searchdata?.artists?.results?.length ? <Searchbox name={'artists'} data={searchdata?.artists?.results} /> : null}
                           {searchdata?.playlists?.results?.length ? <Searchbox name={'playlists'} data={searchdata?.playlists?.results} /> : null}
                           {error ? (
                              <div className='flex flex-col gap-5 justify-cente bg-red-10 items-center w-full h-full'>
                                 <div className='font-bold text-center w-full px-10 mt-10 text-white text-lg'>please enter a correct query or change query ?</div>
                                 <img className='w-[50%] max-sm:w-[70%] h-[30%]' src="no-search-found.png" alt="not found" />
                              </div>
                           ) : null}


                        </>
                     )}
               </div>
            ) : (


               <Routes>
                  <Route index Component={Introduction} />
                  <Route path='discover' Component={Discover} />
                  <Route path='albums' Component={Albums} />
                  <Route path='playlists' Component={Artistpage} />
                  <Route path='favourites' Component={Favourite} />
               </Routes>

            )}
         </div>


      </div>

   )
}

export default Header

// useEffect(() => {

// imageparent.current.addEventListener('mouseenter',()=>{
//    cleatintervalfunction()
//    })

//    imageparent.current.addEventListener('mouseleave',()=>{
//       // setsliderindex(0)
//       intervalfunction()
//    })
// intervalfunction()
// imageref.current.style.transform = `translateX(-${500}px)`;

//  return () => {
//    cleatintervalfunction()
//  };

// }, [])


// const intervalfunction = () => {
//    interval = setInterval(() => {
//       nextSlide()
//    }, 10000);
// }

// const cleatintervalfunction = () => {
//    clearInterval(interval)
// }

// function updateSlider() {
//    let halfwidth = imageref.current.parentNode.clientWidth / 2;
//    let imgwidth = imageref.current.children[0].clientWidth;
//    let newvalue = (((imgwidth - halfwidth) + 12) + imgwidth / 2) + (sliderindex * (imgwidth + 12))
//    // console.log(sliderindex,newvalue);
//    imageref.current.style.transform = `translateX(-${sliderindex === 9 ? 0 : newvalue}px)`;

// }

// function nextSlide() {
//    setsliderindex(prev => (prev + 1) % (trending?.length ? trending?.length : 10))
//    updateSlider();

// }