import { useRef } from "react";
import { useKey } from "../components/hooks/useKey";

export default function NavSearch({ query, setQuery }) {
  const inputRef = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
}
