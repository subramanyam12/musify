import React from 'react';

const NoSearchResult = () => {
  return (
    <div className="justify-cente bg-red-10 flex h-full w-full flex-col items-center gap-5">
      <div className="mt-10 w-full px-10 text-center text-lg font-bold text-white">
        please enter a correct query or change query ?
      </div>
      <img
        className="h-[30%] w-[50%] max-sm:w-[70%]"
        src="no-search-found.png"
        alt="not found"
      />
    </div>
  );
};

export default NoSearchResult;
