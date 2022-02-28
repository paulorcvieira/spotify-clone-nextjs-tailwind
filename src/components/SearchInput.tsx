import { useRouter } from "next/router";
import { useSpotify } from "../context/SpotifyContext";
import {
  MdSearch,
  MdClose,
} from "../icons"

export default function SearchInput() {
  const router = useRouter();

  const { query, setQuery } = useSpotify();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query);
    router.push(`/search/${query}`);
  };

  if (!router.pathname.includes("/search")) {
    return null;
  }

  return (
    <form
      className="flex items-center justify-between w-full gap-3 px-3 py-1.5 bg-white rounded-full"
      onSubmit={handleSubmit}
    >
      <span className="text-gray">
        <MdSearch />
      </span>
      <input
        type="text"
        className="flex-grow w-full text-sm font-semibold bg-transparent text-paper focus:outline-none"
        placeholder="Artists and songs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
      />
      <button
        type="button"
        className="flex items-center focus:outline-none"
        onClick={() => setQuery("")}
      >
        {query && (
          <span className="text-gray hover:text-paper">
            <MdClose />
          </span>
        )}
      </button>
    </form>
  );
}
