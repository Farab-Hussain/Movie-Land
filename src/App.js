import { useEffect, useState } from 'react';
import searchIcon from './search.svg'
import './App.css'
import MovieCard from './MovieCard';


const API_URL = 'http://www.omdbapi.com?apikey=e431dd5c';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMovies(data.Search);  // Update the movies state
        } catch (error) {
            console.error('Error fetching movies', error)
        }
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);
    return (
        <div>
            <h1>MovieLand</h1>
            <div className='search'>
                <input placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt='Search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            <div className='container'>
                {
                    movies?.length > 0
                        ? (
                            movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))
                        ) : (
                            <div className='empty'>
                                <h2>No Movies Found</h2>
                            </div>
                        )
                }

            </div>

        </div>
    );
}

export default App;