import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import movieService from '../services/movieService';
import '../styles/home.scss'

function Home() {
    const [currentPage, setPage] = useState(1);
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        if(!movies) {
            getMovies(currentPage);
        }
    });

    /**
     * Get list of shows from the api
     *
     * @param page
     * @returns {Promise<void>}
     */
    const getMovies = async (page) => {
        let res = await movieService.getMovies(page);

        if ( res.length > 0 ) {
            setMovies(res);
            setPage(page)
        }
    };

    /**
     * Paginate to the next set of shows
     *
     * @returns {Promise<void>}
     */
    const next = async () => {
        return getMovies(currentPage + 1)
    };

    /**
     * Paginate to the previous set of shows
     * @returns {Promise<void>}
     */
    const prev = async () => {
        if ( currentPage > 1 ) {
            return getMovies(currentPage - 1)
        }
    };

    /**
     * render each movie
     *
     * @param movie show object
     * @returns {*}
     */
    const renderMovies = movie => {
        return (
            <div className="movie col-sm-2 mb-4" key={movie.id}>
                <Link to={'/'+movie.id}>
                    <img src={movie.image === null ? '' : movie.image.medium} className="img-thumbnail" width="100%" alt={movie.name}/>
                    <div className="name_container container">
                        <h5 className="name">{movie.name}</h5>
                    </div>

                    <h5 className="rating"><i className="fa fa-star"/> {movie.rating.average}</h5>

                    {(movie.premiered !== null ) ? (
                        <h5 className="year">{movie.premiered.substr(0, 4)}</h5>
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

                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button onClick={prev} className="page-link"><i className="fa fa-arrow-left" /> Prev</button>
                        </li>
                        <li className="page-item">
                            <button onClick={next} className="page-link">Next <i className="fa fa-arrow-right" /></button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Home;
