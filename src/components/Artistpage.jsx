import React,{useState,useEffect} from 'react'
import { contextvalue } from '../Context'
import ADAlayout from './ADAlayout'

const Artistpage = () => {
  const [artistdata, setartistdata] = useState([])
  const {homedata} = contextvalue()
  
  useEffect(()=>{
    setartistdata(homedata?.playlists);
 })

  return (
    <ADAlayout heading='playlists' data={artistdata} />
  )
}

export default Artistpage