import { useEffect, useState } from "react";
import Section from './components/Section';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import './App.css';

function App() {
  const genresCount = 4;
  const [ genres, setGenres ] = useState(null);
  const [limit, setLimit] = useState(genresCount);

  const fetchData = async () => {
    const response = await fetch('/.netlify/functions/getGenres', {
      method: "POST",
      body: limit
    });
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list.values);
  }

  useEffect(() => {
    fetchData();
  }, [, limit]);

  return (
    <>
    <Navbar />
    <HeroSection />
    <div className='container'>
      {genres && Object.values(genres).map((genre, index) => (<Section key={index} genre={genre.value}/>))}
    </div>
     <div className='page-end'
      onMouseEnter={ () => {
        setLimit(limit + genresCount);
      }}
     />
    </>
  );
}

export default App;
