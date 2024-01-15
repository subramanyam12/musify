import React from 'react';

const Playlistskeletion = () => {
  return (
    <>
      {[1, 2, 3, 4].map(item => (
        <div key={item} className="mb-2 flex w-full animate-pulse gap-3 ">
          <svg
            className="h-14 w-14 text-gray-200 dark:text-gray-600 max-sm:h-[15vw] max-sm:w-[15vw]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          <div className="flex w-full flex-col justify-center">
            <div className="h-2 w-[60%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mt-2.5 h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Playlistskeletion;
