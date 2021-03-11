import React,{useEffect, useState} from 'react';
import axios from './axios';
import './Row.css'
import Youtube from 'react-youtube';
import MovieTrailer from 'movie-trailer';
// import movieTrailer from 'movie-trailer';


const baseUrl = "https://image.tmdb.org/t/p/original";

function Row({title,fetchUrl,isLargeRow}) {
    
    const [movies,setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
     // Options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const handleClick = async (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
          );
          setTrailerUrl(trailerurl.data.results[0]?.key);
        }
      };
    

    return (
        <div className="row">
        {/* title */}
        <h2>{title}</h2>

        <div className="row_posters">

        {movies.map((movie) => (
            <img key={movie.id} onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
             src={`${baseUrl}${isLargeRow ? movie.poster_path:movie.backdrop_path
                }`} 
             alt={movie.name} />
        ))}
            {/* posters */}
        </div>

        {/* container */}
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}


    
            
        </div>
    )
}

export default Row
