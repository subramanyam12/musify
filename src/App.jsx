import './App.css';
import Navbar from './components/Navbar';
import Header from './pages/Header';
import RecentSongs from './components/RecentSongs';

function App() {
  return (
    <>
      <div className="box-border flex h-[100svh] w-full overflow-hidden bg-gradient-to-r from-[#8d6947] to-[#66669bfd] max-sm:flex-col">
        <Navbar />
        <Header />
        <RecentSongs />
      </div>
    </>
  );
}

export default App;
