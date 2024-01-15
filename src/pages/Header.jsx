import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

import Discover from './Discover';
import Artistpage from './Artistpage';
import Favourite from './Favourite';
import Albums from './Albums';
import Introduction from '../components/Introduction';

import SearchInput from '../components/search/SearchInput';
import Searchsubox from '../components/search/Searchsubox';
import NoSearchResult from '../components/search/NoSearchResult';
import Searchskeletion from '../loadingskeletons/Searchskeletion';

import { APIFetch } from '../customhooks/APIFetch';
import Nestsearchlayout from '../components/search/Nestsearchlayout';
import useDebounce from '../customhooks/useDebounce';
import handlesearchboxclick from '../customhooks/handlesearchboxclick';

const Header = () => {
  const [searchquery, setsearchquery] = useState('');
  const [searchdata, setsearchdata] = useState({});
  const [emptyresult, setemptyresult] = useState(false);
  const [nestsearchdata, setnestsearchdata] = useState([]);
  const [bool, setbool] = useState(false);
  const debouncevalue = useDebounce(searchquery);
  const [searchloading, setsearchloading] = useState(true);
  let sessionsearchquery = JSON.parse(sessionStorage.getItem('searchquery'));

  useEffect(() => {
    if (sessionsearchquery) {
      setsearchquery(sessionsearchquery);
      fetchsearch(sessionsearchquery);
    }
  }, []);

  useEffect(() => {
    searchquery && fetchsearch(debouncevalue);
  }, [debouncevalue]);

  const fetchsearch = async value => {
    if (!value) return;
    APIFetch('all', value)
      .then(res => {
        let data = res.data.data;
        setsearchdata(res.data.data);
        setsearchloading(false);
        let testbool = true;
        for (let i in data) {
          if (data[i]?.results.length) {
            testbool = false;
          }
        }
        setemptyresult(testbool);
      })
      .catch(err => {
        console.log(err);
        setemptyresult(true);
        setsearchdata({});
      });
  };

  const onchangehandle = useCallback(value => {
    setsearchquery(value);
    sessionStorage.setItem('searchquery', JSON.stringify(value));
    if (value) {
      setsearchloading(true);
    } else {
      setsearchdata({});
      setnestsearchdata([]);
      setbool(false);
      setemptyresult(false);
      sessionStorage.removeItem('searchquery');
    }
  }, []);

  return (
    <div className=" relative flex w-[53vw] flex-col gap-5 pb-2 pl-7 pt-7 max-sm:h-full max-sm:w-full max-sm:px-2 max-sm:pt-4">
      <SearchInput
        searchquery={searchquery}
        setsearchquery={setsearchquery}
        onchangehandle={onchangehandle}
      />
      <div className="relative h-full w-full overflow-hidden rounded-3xl max-sm:mt-16">
        {bool && (
          <Nestsearchlayout setbool={setbool} nestdata={nestsearchdata} />
        )}

        {searchquery.trim() ? (
          <div className="scroll-none flex h-full w-full flex-wrap overflow-y-auto rounded-3xl bg-gradient-to-r from-[#026e707e] to-[#005e7867] shadow max-sm:h-[80vh] max-sm:flex-col max-sm:flex-nowrap max-sm:pb-40">
            {searchloading ? (
              <Searchskeletion />
            ) : (
              <>
                {!!searchdata?.topQuery?.results?.length && (
                  <div className="scroll-none flex h-[10vw] w-full flex-col gap-3 overflow-y-auto max-sm:hidden">
                    <h1 className="text-shadow m-4 text-lg font-bold capitalize text-white">
                      Top search
                    </h1>

                    {searchdata?.topQuery?.results?.map(
                      ({ id, image, title, type, url }) => (
                        <div
                          key={id}
                          onClick={() =>
                            handlesearchboxclick({
                              type,
                              title,
                              id,
                              url,
                              setnestsearchdata,
                              setbool,
                            })
                          }
                          className="flex cursor-pointer items-center px-5"
                        >
                          <div className=" w-[5vw] rounded-xl bg-[#f7f7f7c5] max-sm:w-[15vw]">
                            <img
                              className="h-full w-full rounded-xl"
                              src={image?.at(-1)?.link}
                              alt={title}
                            />
                          </div>
                          <div className="ml-6  font-semibold max-sm:text-sm">
                            <p className="text-white max-sm:hidden">{title}</p>
                            <p className="hidden text-white max-sm:block">
                              {title?.length > 33
                                ? title.substring(0, 33) + '...'
                                : title}
                            </p>
                            <span className="text-[#ffffff7e] ">{type}</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {['songs', 'album', 'artists', 'playlists'].map(name => {
                  let data = searchdata?.[name]?.results;
                  if (!data?.length) return;
                  return (
                    <Searchsubox
                      key={name}
                      name={name}
                      data={data}
                      setnestsearchdata={setnestsearchdata}
                      setbool={setbool}
                    />
                  );
                })}

                {emptyresult && <NoSearchResult />}
              </>
            )}
          </div>
        ) : (
          <Routes>
            <Route index Component={Introduction} />
            <Route path="discover" Component={Discover} />
            <Route path="albums" Component={Albums} />
            <Route path="playlists" Component={Artistpage} />
            <Route path="favourites" Component={Favourite} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default Header;

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
