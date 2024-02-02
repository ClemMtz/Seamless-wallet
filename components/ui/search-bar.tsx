const SearchBar = ({ handleSearch }: any) => {
  return (
    <div className="flex items-center ">
      <input
        type="text"
        placeholder="search name"
        onChange={(e) => handleSearch(e.target.value)}
        className="h-8 w-64  pl-4 rounded-2xl mr-4 focus:outline-0 border border-black"
      />
    </div>
  );
};

export default SearchBar;
