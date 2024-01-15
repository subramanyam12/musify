import React from 'react';

const Searchskeletion = () => {
  return (
    <>
      <div className="flex h-[10vw] w-full flex-col gap-3 max-sm:hidden">
        <h1 className="text-shadow m-4 text-lg font-bold capitalize text-white">
          Top search
        </h1>
        <div className="flex cursor-pointer items-center px-5">
          <div className=" aspect-square w-[5vw] rounded-xl bg-gray-400"></div>
          <div className="ml-4">
            <p className=" mb-2 h-[12.5px] w-36 bg-gray-400"></p>
            <div className="h-[12.5px] w-20 bg-gray-400"></div>
          </div>
        </div>
      </div>

      {['songs', 'albums', 'artists', 'playlists'].map((item, id) => (
        <div key={id} className="w-[50%] animate-pulse max-sm:w-full">
          <h1 className="text-shadow m-4 text-lg font-bold capitalize text-white">
            {item}
          </h1>
          <div className="scroll-none flex h-[13vw] flex-col gap-3 overflow-y-auto max-sm:h-[23vh]">
            {[1, 2, 3]?.map(id => (
              <div key={id} className="flex cursor-pointer items-center px-5">
                <div className=" aspect-square w-[3.5vw] bg-gray-400 max-sm:w-[14vw]"></div>
                <div className="ml-4">
                  <p className=" mb-2 h-[12.5px] w-36 bg-gray-400 max-sm:h-[14px]"></p>
                  <div className="h-[12.5px] w-20 bg-gray-400 max-sm:h-[14px]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Searchskeletion;
