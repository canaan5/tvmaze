import React from "react";
import {BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";
import Search from "./pages/Search";

export default function App() {
    return (
        <Router>
            <div className="container-fluid">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark ">
                        <a className="navbar-brand" href="/">TVMaze</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink exact to="/" className="nav-link" activeClassName="active">Movies <span className="sr-only">(current)</span></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/watchlist" className="nav-link" activeClassName="active">Watchlist</NavLink>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0" action="/search">
                                <input className="form-control mr-sm-2" type="search" name="q" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                </div>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/watchlist">
                        <Watchlist />
                    </Route>

                    <Route path="/search">
                        <Search />
                    </Route>

                    <Route path="/:movie_id" children={<MovieDetail />} />
                </Switch>
            </div>
        </Router>
    );
}
