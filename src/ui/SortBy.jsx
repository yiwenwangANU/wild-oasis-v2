import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { useState } from "react";

function SortBy({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState();

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
    searchParams.set(`${filterField}`, e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select value={selectedOption} onChange={handleSelect}>
      {options.map((option) => (
        <option value={option.value} key={option.label}>
          Sort by {option.label}
        </option>
      ))}
    </Select>
  );
}

export default SortBy;
