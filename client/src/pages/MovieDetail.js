import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import movieService from '../services/movieService';
import '../styles/movie-details.scss'
import watchlistService from "../services/watchlistService";

function MovieDetail() {
    let { movie_id } = useParams();
    const [movie, setMovie] = useState(null);
    const [casts, setCasts] = useState(null);

    useEffect(() => {
        if(!movie) {
            getCasts();
            getMovie();
        }
    });


    const getMovie = async () => {
        let res = await movieService.getMovie(movie_id);
        setMovie(res);
    };

    const getCasts = async () => {
        let res = await movieService.getCasts(movie_id);
        setCasts(res);
    };

    const addToWatchlist = async () => {
        let res = await watchlistService.add(movie);
        if ( res !== false ) {
            alert("Movie added to you watchlist successfully!")
        }
    };

    const renderMovie = movie => {
        return (
            <div>
                <div className="container-fluid details-container pt-5 pb-5">
                    <div className="container">
                        <div className="details">
                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={movie.image === null ? '' : movie.image.original} className="img-thumbnail" alt={movie.name}/>
                                </div>

                                <div className="col-sm-8">
                                    <h1>{movie.name}</h1>

                                    <p>Casts: {(casts && casts.length > 0) ?
                                        (casts.map(cast => (<span className="text-warning" key={cast.person.id + Math.random()}>{cast.person.name}, </span>))) : (<span/>)}</p>

                                    <p>Genre: {(casts && casts.length > 0) ?
                                        (movie.genres.map(genre => (<span className="text-warning" key={movie.id + Math.random()}>{genre}, </span>))) : (<span/>)}</p>

                                    <p>Premiered: <span className="text-warning">{movie.premiered}</span></p>
                                    <p>Language: <span className="text-warning">{movie.language}</span></p>
                                    <p>Runtime: <span className="text-warning">{movie.runtime}Min</span></p>

                                    <p>Schedule: {(movie.schedule.days.length > 0) ?
                                    (movie.schedule.days.map(day => (<span className="text-warning" key={day}>{day}, </span>))) : (<span/>)} @ {movie.schedule.time}</p>

                                    <div  dangerouslySetInnerHTML={{ __html: movie.summary }} />

                                    <button className="btn btn-dark" onClick={addToWatchlist}>Add to watchlist</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Casts*/}
                <div className="container mt-5">
                    <div className="details">
                        <h2 className="text-white">Casts</h2>
                        <hr/>
                        <div className="row mt-2">
                            {(casts && casts.length > 0) ?
                                (casts.map(cast => (
                                    <div className="cast col-sm-2 mb-4" key={cast.person.id + Math.random()}>
                                        <img src={cast.person.image === null ? '' : cast.person.image.medium} className="img-thumbnail" width="100%" alt={cast.person.name}/>

                                        <div className="name_container container">
                                            <h5 className="person_name text-white text-center"><span className="text-white-50">{cast.person.name}</span>
                                                <br/> as <span className="text-warning">{cast.character.name}</span></h5>
                                        </div>
                                    </div>
                                ))) : (<span/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="Details">
            {(movie && movie != null) ? (
                renderMovie(movie)
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MovieDetail;
