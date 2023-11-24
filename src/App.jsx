import react from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import RecentSongs from './components/RecentSongs'


function App() {


  return (
    <>
      <div className='flex max-sm:flex-col h-[100svh] overflow-hidden w-full box-border bg-gradient-to-r b-[#1e2f3f] from-[#8d6947] to-[#66669bfd]'>
        <Navbar />
        <Header />
        <RecentSongs />
      </div>
    </>
  )
}

export default App
