import { useEffect, useState } from "react";
import axios from 'axios'

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = (e: any) => {
    e.preventDefault();
    // Your search logic here using debouncedSearchTerm instead of searchTerm
    // Example: 
    axios.get('/search?query=debouncedSearchTerm')
  };

  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
