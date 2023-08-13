import { useRef, useState } from "react";

export default function GamesFilter({ publishers, genres, onFilterChange }) {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [publisher, setPublisher] = useState("");

    const genreRef = useRef();
    const titleRef = useRef();
    const publisherRef = useRef();

    function handleTitleSearch(e) {
        const titleText = e.target.value;
        setTitle(titleText);
        applyFilter();
    }

    function handleGenreChange(e) {
        const genreText = e.target.value;
        setGenre(genreText);
        applyFilter();
    }

    function handlePublisherChange(e) {
        const publisherText = e.target.value;
        setPublisher(publisherText);
        applyFilter();
    }

    
    function applyFilter() {
        onFilterChange(titleRef.current.value, genreRef.current.value, publisherRef.current.value);
    }

    function resetFilterControls() {
        setTitle("");
        setGenre("");
        setPublisher("");
        genreRef.current.value = "";
        titleRef.current.value = "";
        publisherRef.current.value = "";
    }

    function removeFilters() {
        resetFilterControls();
        applyFilter();
    }

    let genreOptionsJsx = genres.map(genre => {
        return (
            <option value={genre}>{genre}</option>
        )
    })
    genreOptionsJsx.unshift(<option value="">All</option>)

    let publisherOptionsJsx = publishers.map(publisher => {
        return (
            <option value={publisher}>{publisher}</option>
        )
    })
    publisherOptionsJsx.unshift(<option value="">All</option>)

    return (
        <>
            <div>
                <input type="text" ref={titleRef}
                    className="games-search-box"
                    value={title}
                    onChange={(e) => { handleTitleSearch(e) }}
                    placeholder="Enter a title">
                </input>
                <button onClick={() => { removeFilters(); }}>Remove Filters</button>
            </div>

            <div>
                Filters:
                Genre
                <select ref={genreRef}
                onChange={(e) => {handleGenreChange(e)}}>
                    {genreOptionsJsx}
                </select>

                Publisher
                <select ref={publisherRef}
                onChange={(e) => {handlePublisherChange(e)}}>
                    {publisherOptionsJsx}
                </select>
            </div>

        </>
    );
}
