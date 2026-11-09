function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">⌕</span>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search monuments, traditions, festivals, arts, crafts..."
        aria-label="Search Indian culture and heritage"
      />

      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
