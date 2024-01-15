import React from 'react';

const Artistskeletion = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6]?.map(item => (
        <div key={item} className="relative mb-2 flex animate-pulse gap-3 ">
          <svg
            className=" aspect-square w-[11vw] text-gray-200 dark:text-gray-700 max-sm:w-[35vw]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          <div className="absolute bottom-0 left-0 flex h-1/4 w-full items-center justify-center rounded-b-2xl bg-gray-600">
            <div className="-translate-x-1/ h-2 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Artistskeletion;
