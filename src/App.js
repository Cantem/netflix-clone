import { useEffect, useState } from "react";
import Section from './components/Section';
import './App.css';

function App() {
  const [ genres, setGenres ] = useState(null);

  const fetchData = async () => {
    const response = await fetch('/.netlify/functions/getGenres');
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list.values);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const uniqueKey = (index) => `${Math.floor(Math.random() * 100)}_${index}`;

  return (
    <>
     {genres && Object.values(genres).map((genre, index) => (<Section genre={genre.value}/>))}
    </>
  );
}

export default App;
