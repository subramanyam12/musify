import React, { useEffect, useState } from 'react';

import { IoMdDownload } from 'react-icons/io';

const Download = ({ url, name, size = false }) => {
  const [songurl, setsongurl] = useState('');

  useEffect(() => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        setsongurl(URL.createObjectURL(blob));
      });
  }, []);

  return (
    <>
      {songurl ? (
        <a
          href={songurl}
          download={name + '.mp4'}
          className="text-2xl text-gray-300 duration-100 hover:text-gray-100"
        >
          <abbr title="download">
            <div
              className={`hover:bg-[#00000059] ${size && 'scale-75'
                } rounded-full border-[1px] border-[#ffffff48] p-2`}
            >
              <IoMdDownload />
            </div>
          </abbr>
        </a>
      ) : null}
    </>
  );
};

export default Download;
