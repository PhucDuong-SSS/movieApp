import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=c032e2d7'

const App = () => {
    const [movies, setMovies] = useState([])
    const [title, setTitle] = useState('Spiderman')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data  = await response.json();
        setMovies(data.Search)
    }

    const handleSearchTitle = (title) => {
        setTitle(title);
    }

    const handleClick = () => {
        searchMovies(title)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchMovies(title)
    }

    useEffect(() => {
        searchMovies(title)
    }, []);
    return (
        <div className='app'>
            <h1>
                Movie Land
            </h1>
            <div className='search'>
                <input
                    placeholder='Search for movies'
                    onChange={(e) => handleSearchTitle(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                <img
                    src={SearchIcon}
                    alt='search icon'
                    onClick={handleClick}
                />
            </div>
            {
                movies?.length > 0 ? (
                    <div className='container'>          
                        { movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>          
                        <h2>Not found</h2>
                    </div>
                )
            }
           
        </div>
    )
}

export default App;
