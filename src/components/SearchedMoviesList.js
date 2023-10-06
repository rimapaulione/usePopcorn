import SearchedMovie from "./SearchedMovie";

export default function SearchedMoviesList({ movies, onSelectId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <SearchedMovie
          key={movie.imdbID}
          movie={movie}
          onSelectId={onSelectId}
        />
      ))}
    </ul>
  );
}
