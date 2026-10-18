export function Filter({ searchTerm, handleSearch }) {
  return (
    <label>
      Filter on:{" "}
      <input type="text" value={searchTerm} onChange={handleSearch} />
    </label>
  );
}
