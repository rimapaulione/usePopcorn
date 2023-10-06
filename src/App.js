import { useState } from "react";
import NavBar from "./components/NavBar";
import NavSearch from "./components/NavSearch";
import NavNumResult from "./components/NavNumResult";
import Main from "./components/UI/Main";
import Box from "./components/UI/Box";
import SearchedMoviesList from "./components/SearchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import ErrorMessage from "./components/UI/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
import { useMovies } from "./components/hooks/useMovie";

export const KEY = "a0cadc6b";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "Watched");
  const { movies, isLoading, error } = useMovies(KEY, query, closeMovieHandler);

  function selectedIDHandler(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function closeMovieHandler() {
    setSelectedId(null);
  }

  function addWatchedHandler(newWatched) {
    setWatched((watched) => [...watched, newWatched]);
    setSelectedId(null);
  }

  function deleteWatchedHandler(id, e) {
    e.stopPropagation();
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <NavSearch query={query} setQuery={setQuery} />
        <NavNumResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <p className="loader">Loading...</p>}
          {!isLoading && !error && (
            <SearchedMoviesList
              movies={movies}
              onSelectId={selectedIDHandler}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onCloseMovie={closeMovieHandler}
              onAddWatched={addWatchedHandler}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={deleteWatchedHandler}
                onSelectId={selectedIDHandler}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
