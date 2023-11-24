import React, {useState, useEffect } from 'react'
import { contextvalue } from '../Context'
import ADAlayout from './ADAlayout'

const Discover = () => {
    const [discoverdata, setdiscoverdata] = useState([])
    const {homedata} = contextvalue()

    useEffect(()=>{
       setdiscoverdata(homedata?.charts);
    })
  return (
     <ADAlayout heading='old playlists' data={discoverdata} />
  )
}

export default Discover