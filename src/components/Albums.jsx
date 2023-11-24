import React,{useState,useEffect} from 'react'
import { contextvalue } from '../Context'
import ADAlayout from './ADAlayout'

const Albums = () => {
  const [albumdata, setalbumdata] = useState([])
  const {homedata} = contextvalue()
  
  useEffect(()=>{
    setalbumdata(homedata?.albums);
 })



  return (
    <ADAlayout heading='albums' data={albumdata} />
  )
}

export default Albums