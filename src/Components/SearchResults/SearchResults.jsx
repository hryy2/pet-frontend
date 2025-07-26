const SearchResults = ({ results }) => {
  return (
    <div>
      {results.map((item) => (
        <div key={item._id} className="search-result-item">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
