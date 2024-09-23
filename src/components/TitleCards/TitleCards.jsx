import React from 'react'
import './TitleCards.css'
import { useEffect ,useRef ,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from '../../Axios.jsx'

const TitleCards = ({title, category}) => {
  const cardsRef = useRef();

  const [apiData, setApiData]=useState([])
  
  const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
  async function fetchData(){
    
    const request = await axios.get(category);
    setApiData(request.data.results);
    return request;
  }

  cardsRef.current.addEventListener('wheel',handleWheel);
  fetchData();
},[category])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef} >
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index} >
            <img src={'https://image.tmdb.org/t/p/original'+card.backdrop_path} alt='card image'/>
            <p>{card?.name || card?.title || card?.original_title || card?.original_name}</p>
          </Link>
        })}

      </div>
      
    </div>
  )
}

export default TitleCards;
