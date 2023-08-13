import { useEffect, useState } from "react"
import GamesService from "../services/games-service";
import GamesFilter from "./GamesFilter";

const gamesService = new GamesService('http://localhost:3000');

export default function GamesList() {

    const [allGames, setAllGames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState([])

    useEffect(
        //function def
        () => {
            gamesService.getGame()
                .then(gamesJsonData => {
                    setGames(gamesJsonData);
                    setAllGames(gamesJsonData);
                    setGenres(getUniqueGenresList(gamesJsonData));
                    setPublishers(getPublishersList(gamesJsonData));
                })
                .catch(error => {
                    setErrorMessage("SERVER DOWN! Unable to connect to server. Please try again later.")
                })
        },
        //dependencies
        []
    );

    const getUniqueGenresList = function(games) {
        const allGenresList = games.map(game => game.genre);
        const uniqueGenresList = [...new Set(allGenresList)];
        return uniqueGenresList;
    }

    const getPublishersList = function(games) {
        const allPublishersList = games.map(game => game.publisher);
        const uniquePublishersList = [...new Set(allPublishersList)];
        return uniquePublishersList;
    }

    const applyFilter = function(title,genre,publisher) {
        let filteredGames = allGames.filter(game => 
            game.title.toLowerCase().includes(title.toLowerCase()) &&
            game.genre.toLowerCase().includes(genre.toLowerCase()) &&
            game.publisher.toLowerCase().includes(publisher.toLowerCase())
        );
        setGames(filteredGames);
    }

    const showAllGames = function() {
        setGames(allGames);
    }

    //  Checks platform and assigns Initial
    function getPlatformIcon(platform){
        if(platform.includes("Windows"))
            return "W";
        if(platform.includes("Android"))
            return "A";
        if(platform.includes("Browser"))
            return "B";

    }

    // Displays games
    let gamesListJsx = games.map(game => {
        return (
            <>

                <div className="game-card card grow mb-3 shadow h-md-250 video-card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 align-self-center mt-n2">
                                <div className="card">
                                    <div className="image-wrapper">
                                        <img className="card-img-top" src={game.thumbnail} alt={game.title} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-7 col-sm-6 col-lg-7 align-self-center justify-content-center position-static">
                                <a href={game.game_url} className="stretched-link no-underline">
                                    <h4 className="card-title text-truncate mt-n2 mb-1">{game.title}</h4>
                                </a>
                                <div className="text-truncate text-muted mb-1">{game.short_description}</div>
                                <span className="badge badge-secondary text-dark mr-2">{game.genre}</span>
                                <span className="badge badge-secondary text-dark mr-2">{game.publisher}</span>
                            </div>
                            <div className="col-1 align-self-center text-center text-muted justify-content-center d-none d-sm-block">
                                <h5><i className="fab fa-windows">{getPlatformIcon(game.platform)}</i></h5>
                            </div>
                            <div className="col-1 justify-content-center text-center align-self-center">
                                <span className="badge badge-ftg py-2 px-2 mb-2">FREE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="game-card card grow mb-3 shadow h-md-250 video-card" data-video-src="/g/559/videoplayback.webm">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 align-self-center mt-n2">
                                <div className="card">
                                    <div className="image-wrapper">
                                        <img className="card-img-top" src="/g/559/thumbnail.jpg" alt="Tales Of Yore" />
                                        <div className="loader-wrapper"> <div className="spinner-grow ftg-blue" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        </div>
                                    </div>
                                    <video class="featuredvideo" loop="" preload="none" muted=""></video>
                                </div>
                            </div>
                            <div className="col-7 col-sm-6 col-lg-7 align-self-center justify-content-center position-static">
                                <a href="/tales-of-yore" className="stretched-link no-underline">
                                    <h4 class="card-title text-truncate mt-n2 mb-1">{game.title}</h4>
                                </a>
                                <div className="text-truncate text-muted mb-1">{game.short_description}</div>
                                <span className="badge badge-secondary text-dark mr-2">{game.genre}</span>
                                <span className="badge text-dark badge-secondary mr-2">{game.publisher}</span>
                            </div>
                            <div className="col-1 align-self-center text-center text-muted justify-content-center d-none d-sm-block">
                                <h5><i className="fab fa-windows">Windows</i></h5>
                            </div>
                            <div className="col-1 justify-content-center text-center align-self-center">
                                <span className="badge badge-ftg py-2 px-2 mb-2">FREE</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </>
        )
    })

    //Output
    return (
        <>
            {/* <GamesFilter genres = {genres} onTitleChange={filterGameByTitle} onGenreChange={filterGamesByGenre} onRemoveFilters={showAllGames}></GamesFilter> */}
            <GamesFilter publishers = {publishers} genres = {genres} onFilterChange={applyFilter} ></GamesFilter>
            {errorMessage && <h3>{errorMessage}</h3>}
            {/* {!errorMessage && <GamesFilter onTitleChange={filterGameByTitle} onRemoveFilters={showAllGames}></GamesFilter>} */}
            <div className="games-list-container">
                {gamesListJsx}
            </div>
        </>
    )
}