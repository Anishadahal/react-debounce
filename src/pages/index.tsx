import axios from "axios";
import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

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

  useEffect(() => {
    // Your search logic here using debouncedSearchTerm instead of searchTerm
    //Example:
    axios.get(`https://demo.dataverse.org/api/search?q=${debouncedSearchTerm}`);
  }, [debouncedSearchTerm]);

  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchBar;
