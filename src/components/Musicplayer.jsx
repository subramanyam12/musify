import React,{useState,useRef,useEffect} from 'react'
import {IoPlayBackSharp,IoPlayForwardSharp,IoPlaySharp,IoShuffleOutline} from 'react-icons/io5'
import {BsRepeat,BsRepeat1,BsPauseFill} from 'react-icons/bs'
import {MdOutlineShuffle} from 'react-icons/md'
import { contextvalue,setartistvalue } from '../Context'
import {BiTimeFive} from 'react-icons/bi'
import { IoIosArrowDropupCircle,IoIosArrowDropdownCircle } from "react-icons/io";


const Musicplayer = ({setrecentclose}) => {
    const [playbool, setplaybool] = useState(true)
    const [musicindex, setmusicindex] = useState(0)
    const [currentime, setcurrentime] = useState('00:00')
    const [durationtime, setdurationtime] = useState('00:00')
    const [widthupdate, setwidthupdate] = useState(0)
    const [repeatbool, setrepeatbool] = useState(false)
    const [shufflebool, setshufflebool] = useState(false)
    const [songlist, setsonglist] = useState([])
    const {song} = contextvalue()
    const setsong = setartistvalue()
    const [imageclose, setimageclose] = useState(true)
    
    const audioplay=useRef(null)
    const musicanime=useRef()
   
  
  let localplaylist = JSON.parse(localStorage.getItem('playlist'))
  let localindex = JSON.parse( localStorage.getItem('currentindex'))
    useEffect(()=>{
       
        setsonglist(song?.nestsearchdata?.length ? song?.nestsearchdata :localplaylist )
       !song?.nestsearchdata?.length && localindex && setmusicindex(localindex)
            song?.index !==musicindex && setmusicindex(song?.index)
        setwidthupdate(0)
        setTimeout(() =>{
            audioplay.current?.play()
            setplaybool(audioplay.current?.paused)
        },1000)
        
    },[song?.nestsearchdata,,song?.index])
    
    useEffect(()=>{
        song?.index !==musicindex && setsong(prev=>({...prev,index:musicindex}))
        localStorage.setItem('currentindex',JSON.stringify(musicindex))
        addrecentlist()
    },[musicindex])

    

    let localrecentlist = JSON.parse(localStorage.getItem('recentlist'))
    const addrecentlist = ()=>{
        if(!songlist?.[musicindex])return
        const {id,image,name,album,primaryArtists,downloadUrl}= songlist[musicindex]
        let storedata={id,image:typeof image ==='object'? image?.at(-1)?.link:image,name,album:album?.primaryArtists,primaryArtists,downloadUrl:typeof downloadUrl ==='object' ? downloadUrl?.at(-1)?.link : downloadUrl }
        if(localrecentlist?.length){
            let checkindex = localrecentlist.findIndex((item)=>item.id===id)
            checkindex!==-1 && localrecentlist.splice(checkindex,1)
             localrecentlist.unshift(storedata)
             localrecentlist?.length>10 && localrecentlist.pop()
            storedata = JSON.parse(JSON.stringify(localrecentlist))
        }else{
            storedata = [storedata]
        }
        localStorage.setItem('recentlist',JSON.stringify(storedata))
    }
    
    const playhandle = ()=>{ 
        if(audioplay.current.paused){
           audioplay.current.play()
           setplaybool(false)
        }else{
            audioplay.current.pause()
            setplaybool(true)
        }
    }

    const playforwardhandle=()=>{
        setwidthupdate(0)
        if(shufflebool){
           let shuffleindex;
           do{
            shuffleindex=Math.floor((Math.random()*songlist.length))
           }while(shuffleindex===musicindex)
           setmusicindex(shuffleindex)
        }else{
            setmusicindex(musicindex===songlist.length-1 ? 0 :musicindex+1)
        }
        setTimeout(() => playbool ? audioplay.current.pause() : audioplay.current.play())
    }


    const playbackhandle=()=>{
        setwidthupdate(0)
        if(shufflebool){
            let shuffleindex;
            do{
             shuffleindex=Math.floor((Math.random()*songlist.length))
            }while(shuffleindex===musicindex)
            setmusicindex(shuffleindex)
         }else{
            setmusicindex(musicindex===0 ? songlist.length-1 :musicindex-1)
         }
        setTimeout(() => playbool ? audioplay.current.pause() : audioplay.current.play())
    }

    const timecalc =(time)=>{
       let mins=Math.floor(time / 60)
       let secs=Math.floor(time % 60)
       return `${mins < 10 ? `0${mins}`:mins}:${secs < 10 ? `0${secs}`:secs}`
    }

    const timeupdatehandle =()=>{
        setcurrentime(timecalc(audioplay.current.currentTime))
        let percentage=(audioplay.current.currentTime/audioplay.current.duration) * 100
        setwidthupdate(percentage);
    }
    
    const durationupdate =()=>{
        setdurationtime(timecalc(audioplay.current.duration))
    }

    const widthclickhandle =(e)=>{
        let changewidth=(e.nativeEvent.offsetX/e.nativeEvent.srcElement.clientWidth)
        setwidthupdate(changewidth * 100);
        audioplay.current.currentTime = changewidth * audioplay.current.duration 
    }
    
    const audioendhandle =()=>{
        if(repeatbool){
            audioplay.current.currentTime=0;
            audioplay.current.play()
        }else{
            playforwardhandle()
        }
    }

  return (
    
    <div className={` w-[25vw] max-sm:absolute max-sm:bottom-0 max-sm:w-full duration-200  ${!imageclose ? 'max-sm:h-[40vh]':' max-sm:h-[15vh] '} imageclosetransitition mx-auto px-[3vw] max-sm:px-[6vw] py-[2vw] flex flex-col gap-2 items-center rounded-3xl max-sm:rounded-b-none bg-gradient-to-b from-[#1b5ca1] to-[#2e5f6e] shadow shadow-gray-500`}>
        <div onClick={()=>setimageclose(prev=>!prev)} className='hidden max-sm:block absolute -top-4 right-6 text-[#ffffff4b] text-4xl'>{imageclose ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}</div>
        <div ref={musicanime} className={`w-[40%] ${imageclose && 'max-sm:hidden'} mt-2 mb-5 relative aspect-square rounded-full flex items-center justify-center bg-gray-400`}>
            <img className=' aspect-square rounded-full object-cover' src={typeof songlist?.[musicindex]?.image ==='object' ? songlist?.[musicindex]?.image?.at(-1)?.link :songlist?.[musicindex]?.image || 'musicphoto.jpg'} alt="image" />
        </div>

        <div className='text-center'>
            <div onClick={()=>setrecentclose(false)} className='hidden max-sm:block absolute left-6 text-2xl text-gray-400'><BiTimeFive /></div>
            <p className='text-white font-bold'>{songlist?.[musicindex]?.name?.length>28 ? songlist[musicindex]?.name?.replaceAll("&quot;",'').substring(0,28)+'...' : songlist?.[musicindex]?.name?.replaceAll("&quot;",'') || 'song'}</p>
            <span className={`text-gray-400 ${imageclose && 'max-sm:hidden'}`}>{songlist?.[musicindex]?.primaryArtists?.length>28 ? songlist[musicindex]?.primaryArtists.substring(0,28)+'...':songlist?.[musicindex]?.primaryArtists || 'artist'}</span>
        </div>
        
        <div className='w-full flex items-center justify-between font-semibold text-gray-400'>
            <small className='w-10 text-center'>{currentime}</small>
            <div onClick={(e)=>widthclickhandle(e)} className='h-1 w-[60%] bg-gray-500 cursor-pointer max-sm:cursor-default'>
               <div style={{width:`${widthupdate}%`,transition:'width 100ms linear'}} className={`w-[0%] h-full bg-white relative before:absolute before:-right-[5px] before:-top-[3px] before:rounded-full before:bg-white before:w-[10px] before:h-[10px]`}></div>
            </div>
            <small className='w-10 text-center duration-200'>{durationtime}</small>
        </div>
        
          
        <div className='w-full text-2xl max-sm:text-3xl mt-5 max-sm:mt-1 text-[#ffffffc7] flex justify-between items-center'>
            <span onClick={()=>setrepeatbool(!repeatbool)} className='cursor-pointer max-sm:cursor-default'>{repeatbool ? <BsRepeat1 /> : <BsRepeat />}</span>
            <div className='flex items-center gap-3 text-3xl max-sm:text-4xl'>
                <small onClick={playbackhandle} className='cursor-pointer max-sm:cursor-default'><IoPlayBackSharp /></small>
                <div onClick={playhandle} className='bg-[#ffffffc7] rounded-xl text-xl max-sm:text-2xl flex items-center justify-center p-[10px] text-gray-700 cursor-pointer max-sm:cursor-default'>
                    <audio ref={audioplay} onTimeUpdate={timeupdatehandle} onLoadedData={durationupdate} onEnded={audioendhandle} src={typeof songlist?.[musicindex]?.downloadUrl ==='object' ? songlist?.[musicindex]?.downloadUrl?.at(-1)?.link :songlist && songlist[musicindex]?.downloadUrl} hidden >
                    </audio>
                    {playbool ? <IoPlaySharp /> :<BsPauseFill /> }
                </div>
                <small onClick={playforwardhandle} className='cursor-pointer max-sm:cursor-default'><IoPlayForwardSharp /></small>
            </div>
            <span onClick={()=>setshufflebool(!shufflebool)} className='cursor-pointer max-sm:cursor-default'>{shufflebool ? <MdOutlineShuffle /> : <IoShuffleOutline />}</span>
        </div>
    </div>

  )
}

export default Musicplayer