import React from 'react';
import handlesearchboxclick from '../../customhooks/handlesearchboxclick';

const Searchsubox = ({ name, data, setnestsearchdata, setbool }) => {

  return (
    <div className="w-[50%] max-sm:w-full">
      <h1 className="text-shadow m-4 text-lg font-bold capitalize text-white">
        {name}
      </h1>
      <div className="scroll-none flex h-[13vw] flex-col gap-3 overflow-y-auto max-sm:h-[23vh]">
        {data?.map(({ id, image, title, type }) => (
          <div
            key={id}
            onClick={() =>
              handlesearchboxclick({
                type,
                title,
                id,
                setnestsearchdata,
                setbool,
              })
            }
            className="flex cursor-pointer items-center px-5 max-sm:cursor-default"
          >
            <div className=" w-[3.5vw] max-sm:w-[14vw]">
              <img
                className="h-full w-full"
                src={image?.at(-1)?.url}
                alt={title}
              />
            </div>
            <div className="ml-4 text-[12.5px] font-semibold max-sm:text-sm">
              <p className="text-white max-sm:hidden ">
                {title?.length > 25 ? title.substring(0, 25) + '...' : title}
              </p>
              <p className="hidden text-white max-sm:block">
                {title?.length > 33 ? title.substring(0, 33) + '...' : title}
              </p>
              <span className="text-[#ffffff7e] ">
                {type?.length > 25 ? type.substring(0, 25) + '...' : type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchsubox;
