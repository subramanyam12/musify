import React, { useEffect, useState } from 'react'
import { GoHomeFill, GoHome } from 'react-icons/go'
import { BiCompass, BiSolidCompass } from 'react-icons/bi'
import { IoAlbumsOutline, IoAlbums, IoHeartHalfSharp, IoHeartSharp, IoClose } from 'react-icons/io5'
import { PiPlaylistBold, PiPlaylistDuotone } from "react-icons/pi";
import { HiMenuAlt3 } from "react-icons/hi";
import axios from 'axios'
import { Link } from 'react-router-dom'
import { contextvalue } from '../Context'


const Navbar = () => {
    const menu = [
        [GoHome, GoHomeFill, 'home'],
        [BiCompass, BiSolidCompass, 'discover'],
        [IoAlbumsOutline, IoAlbums, 'albums'],
        [PiPlaylistDuotone, PiPlaylistBold, 'playlists'],
        [IoHeartHalfSharp, IoHeartSharp, 'favourites']
    ]

    let menuitemindex = menu.findIndex(item=>window.location.hash.split('/')[1]===item[2])

    const [menuitem, setmenuitem] = useState(menu[menuitemindex===-1 ? 0 :menuitemindex][2]);
    const [close, setclose] = useState(false)
    const { sethomedata } = contextvalue()
    useEffect(() => {
        fetchhomepage()
    }, [])

    const fetchhomepage = () => {
        axios.get('https://saavn.me/modules?language=hindi,english,telugu')
            .then(res => sethomedata(res.data?.data))
            .catch(err => console.log(err))

    }


    const menuclickhandle = (name) => {
        setmenuitem(name)
        setclose(false)
    }

    return (
        <>
            <div onClick={() => setclose(prev => !prev)} className='absolute max-sm:p-1 z-30 hidden max-sm:block right-5 top-4 text-3xl text-gray-800'>{close ? <IoClose className='text-gray-400 relativ -mt-2' /> : <HiMenuAlt3 />}</div>
            <div className={`w-[17vw] max-sm:w-[50%] overflow-hidden max-sm:z-20 h-full max-sm:h-fit max-sm:pb-5 max-sm:pt-12 ${!close && 'max-sm:hidden'} flex flex-col max-sm:absolute max-sm:right-0 max-sm:rounded-bl-3xl items-center gap-8 pt-5 bg-gradient-to-r from-[#00000057] max-sm:from-[#0000009a] max-sm:to-[#0000008a] to-[#0000002a]`}>
                <div className='flex flex-col max-sm:hidden gap-1 items-center'>
                    <div className='w-[5vw] aspect-square rounded-full flex items-center justify-center bg-[#ffffff60]'><img className='w-[80%] mt-[1px] mr-[1px] aspect-square object-cover' src='hiuser.png' alt='logo' /></div>
                    <h1 className='text-xl text-white font-bold'>hi user</h1>
                </div>

                <div className='w-full pl-[2vw] max-sm:pl-[4vw] max-md:pl-l flex flex-col'>

                    <div className='flex flex-col item-center w-full gap-2 capitalize'>
                        {
                            menu.map(([Icon, Fill, name], i) => (
                                <Link key={i} to={name === 'home' ? '/' : name} onClick={() => menuclickhandle(name)} className={`flex items-center w-full max-sm:cursor-default text-[#afaeae] ml-2 py-1 gap-3 relative duration-300  ${menuitem == name ? 'font-bold text-white before:absolute before:right-[8px] before:w-[5px] before:rounded-xl before:bg-[#ffffff73] before:h-full' : 'font-semibold'}`}>
                                    {menuitem === name ? <Fill className='text-xl' /> : <Icon className='text-xl' />}
                                    <span>{name}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar