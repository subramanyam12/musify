import React, { useEffect, useState } from 'react'
import { IoMdDownload } from "react-icons/io";

const Download = ({ url, name, size = false }) => {
    const [songurl, setsongurl] = useState('')

    useEffect(() => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                setsongurl(URL.createObjectURL(blob))
            })
    }, [])

    return (
        <>
            {songurl ? (
                <a href={songurl} download={name+'.mp4'} className='text-gray-300 hover:text-gray-100 text-2xl duration-100'>
                    <abbr title="download">
                        <div className={`hover:bg-[#00000059] ${size && 'scale-75'} p-2 rounded-full border-[1px] border-[#ffffff48]`}>
                            <IoMdDownload />
                        </div>
                    </abbr>
                </a>) : null}
        </>

    )
}

export default Download