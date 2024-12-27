import React, { useState } from 'react';
import './SearchRecipe.css';

const SearchRecipe = ({ recipes, onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery) ||
      recipe.description.toLowerCase().includes(searchQuery) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery)
      )
    );

    onSearchResults(filteredRecipes);
  };

  return (
    <div className="search-recipe">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search recipes by title, description, or ingredients..."
        className="search-input"
      />
    </div>
  );
};

export default SearchRecipe;
    