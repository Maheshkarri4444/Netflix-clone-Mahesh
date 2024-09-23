import React  from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar.jsx'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import requests from '../../requests.jsx'
import { useEffect , useState } from 'react'
import axios from '../../Axios.jsx'
import { Link } from 'react-router-dom'



const Home = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  //for Banner

  const [movie, setMovie] = useState([]);

  useEffect(() => {

    async function fetchData() {

      const request = await axios.get(requests.fetchActionMovies);
      setMovie(
        request.data.results[Math.floor(Math.random() * request.data.results.length - 1) ]
      );
      return request;
    }
    fetchData();
  }, []);

  function description(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }


  return (
    <div className='home'>
    <Navbar/>
    <div className='hero'>
      <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt='hero banner' className='banner-img'/>
      <div className='hero-caption'>
        <h1 className='hero-title'> {movie?.title || movie?.name || movie?.original_name}</h1>
        <p>{description(movie?.overview, 70)}</p>
        <div className='hero-btns'>
          <Link to={`/player/${movie.id}`}><button className='btn'><img src={play_icon} alt='play'/>Play</button></Link>
          <button className='btn dark-btn'><img src={info_icon} alt='info'/>More Info</button>
        </div>
        {/* <TitleCards/> */}
        <TitleCards title={"Trending"} category={requests.fetchTrending}/>
      </div>
    </div>
    <div className='more-cards'>
      <TitleCards title={"Netflix Originals"} category={requests.fetchNetflixOriginals}/>
      {isMobile && <TitleCards title={"Trending"} category={requests.fetchTrending}/>}
      <TitleCards title={"Top Rated"} category={requests.fetchTopRated}/>
      <TitleCards title={"Action Movies"} category={requests.fetchActionMovies}/>
      <TitleCards title={"Comedy Movies"} category={requests.fetchComedyMovies}/>
      <TitleCards title={"Horror Movies"} category={requests.fetchHorrorMovies}/>
      <TitleCards title={"Romantic Movies"} category={requests.fetchRomanceMovies}/>
      <TitleCards title={"Documentaries"} category={requests.fetchDocumentaries}/>
    </div>
    <Footer/>
      
    </div>
  )
}

export default Home;
