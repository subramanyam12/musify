import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';

const Introskeletion = () => {
  return (
    <>
      {[1, 2, 3]?.map(item => (
        <div key={item} className="relative flex animate-pulse gap-3 ">
          <div className="aspect-[1.5/1] rounded-3xl bg-gray-400 shadow ">
            <div className="absolute bottom-0 left-0 flex h-full w-full flex-col items-center justify-center rounded-3xl bg-[#000000a2] pt-20 text-center font-semibold text-[#ffffffb7] duration-300">
              <AiFillPlayCircle className="mb-3 cursor-pointer rounded-full bg-gray-400 text-5xl text-gray-50 opacity-40 max-sm:cursor-default" />
              <div className="h-4 w-36 rounded-full bg-gray-500 text-xl max-sm:w-32"></div>
              <br />
              <p className="-mt-3 h-3 w-20 rounded-full bg-gray-500 text-xl max-sm:w-16"></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Introskeletion;
