import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
  onSelectId,
}) {
  return (
    <ul className="list list-movies">
      {watched?.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
          onSelectId={onSelectId}
        />
      ))}
    </ul>
  );
}
