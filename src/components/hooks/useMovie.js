import { useState, useEffect, useCallback } from "react";

export function useMovies(KEY, query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(null);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("💥Something went wrong with fetching movies!💥");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("❌ Can not find movie! ❌");
          }

          setMovies(data.Search);
          setError(null);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setError(null);
        setMovies([]);
        return;
      }
      callback?.();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
