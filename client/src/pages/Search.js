import React, { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import queryString from 'query-string';
import movieService from '../services/movieService';
import '../styles/search.scss'

function Search() {
    let location = useLocation();
    let query = location.search;
    let params = queryString.parse(query);

    const [movies, setMovies] = useState(null);

    useEffect(() => {
        if(!movies) {
            searchMovies(params['q']);
        }
    });

    const searchMovies = async (query) => {
        let res = await movieService.searchMovies(query);

        if ( res.length > 0 ) {
            setMovies(res);
        }
    };

    const renderMovies = movie => {
        return (
            <div className="movie col-sm-2 mb-4" key={movie.show.id}>
                <Link to={'/'+movie.show.id}>
                    <img src={movie.show.image === null ? '' : movie.show.image.medium} width="100%" alt={movie.name}/>
                    <div className="name_container container">
                        <h5 className="name">{movie.show.name}</h5>
                    </div>

                    {(movie.show.rating.average !== null) ?
                        (<h5 className="rating"><i className="fa fa-star"/> {movie.show.rating.average}</h5>) : (<span/>)}

                    {(movie.show.premiered !== null ) ? (
                        <h5 className="year">{movie.show.premiered.substr(0, 4)}</h5>
                        ) : (<span/>)
                    }
                </Link>
            </div>

        );
    };

    return (
        <div className="Home">
            <div className="container">
                <div className="row">
                {(movies && movies.length > 0) ? (
                movies.map(movie => renderMovies(movie))
                ) : (
                <p>Loading...</p>
                )}
                </div>
            </div>
        </div>
    );
}

export default Search;
