import React, { useState, useEffect } from "react";
import watchlistService from '../services/watchlistService';
import {Link} from "react-router-dom";
import '../styles/watchlist.scss'

function Watchlist() {
  const [watchlist, setwatchlist] = useState(null);

  useEffect(() => {
      if(!watchlist) {
          getWatchlist();
      }
  });

  const getWatchlist = async () => {
      let res = await watchlistService.getAll();
      console.log(res);
      setwatchlist(res);
  };

  const renderWatchlist = movie => {
      return (
          <div className="movie col-sm-2 mb-4" key={movie._id}>
              <Link to={'/'+movie._id}>
                  <img src={movie.image === null ? '' : movie.image} width="100%" alt={movie.name}/>
                  <div className="name_container container">
                      <h5 className="name">{movie.name}</h5>
                  </div>

                  {(movie.rating !== null) ?
                      (<h5 className="rating"><i className="fa fa-star"/> {movie.rating}</h5>) : (<span/>)}

                  {(movie.date !== null ) ? (
                      <h5 className="year">{movie.date.substr(0, 4)}</h5>
                  ) : (<span/>)
                  }
              </Link>
          </div>
      );
  };

  return (
    <div className="Watchlist">
        <div className="container">
            {(watchlist && watchlist.length > 0) ? (
                <div className="row">
                    {watchlist.map(product => renderWatchlist(product))}
                </div>
            ) : (
                <div className="text-center p-5">
                    <p className="text-white-50">You do not have anything in your watchlist!</p>
                </div>
            )}
        </div>
    </div>
  );
}

export default Watchlist;
