import React,{useEffect, useState} from 'react';
import axios from './axios';
import requests from './requests'


function Banner() {
    const [movie,setMovie] = useState([]);

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ]);
            return request;
        }
        fetchData();
    },[]);
    return (
        <header className="banner"
        style={{
            backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backdropPosition: "center center",
        }}
        >

        <div className="banner_contents">
            {/* title */}
            <h1>
            {movie?.title || movie?.name || movie?.original_name}
            </h1>

            {/* div 2 button */}
            <div className="banner_buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My List </button>
            </div>

            {/* discription */}
            <h1 className="banner_description">{(movie?.overview)}</h1>
        </div>
        
        </header>
    )
}

export default Banner