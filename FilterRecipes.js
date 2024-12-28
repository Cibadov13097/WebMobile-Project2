import React, { useState } from 'react';
import './FilterRecipes.css'; // Optional: Add CSS for styling

const FilterRecipes = ({ recipes, onFilterResults }) => {
  const [filters, setFilters] = useState({
    difficulty: '',
    tags: '',
  });

  const [sortOption, setSortOption] = useState('');

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const applyFilters = () => {
    if (!recipes || recipes.length === 0) {
      onFilterResults([]); // Provide an empty array as the filtered result
      return;
    }

    let filteredRecipes = recipes;

    if (filters.difficulty) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.difficulty === filters.difficulty
      );
    }

    if (filters.tags) {
      const tagsArray = filters.tags.toLowerCase().split(',').map((tag) => tag.trim());
      filteredRecipes = filteredRecipes.filter((recipe) =>
        tagsArray.every((tag) => recipe.tags.map((t) => t.toLowerCase()).includes(tag))
      );
    }

    if (sortOption) {
      filteredRecipes = [...filteredRecipes].sort((a, b) => {
        if (sortOption === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortOption === 'createTime') {
          return new Date(a.createTime) - new Date(b.createTime);
        } else if (sortOption === 'updateTime') {
          return new Date(a.updateTime) - new Date(b.updateTime);
        } else if (sortOption === 'difficulty') {
          const difficultyOrder = ['Easy', 'Medium', 'Hard'];
          return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
        } else if (sortOption === 'tags') {
          return a.tags.length - b.tags.length;
        }
        return 0;
      });
    }

    onFilterResults(filteredRecipes);
  };

  const clearFilters = () => {
    setFilters({ difficulty: '', tags: '' });
    setSortOption('');
    onFilterResults(recipes); // Reset to show all recipes
  };

  return (
    <div className="filter-recipes">
      <h2>Filter Recipes</h2>
      <div className="filter-controls">
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          type="text"
          name="tags"
          value={filters.tags}
          onChange={handleFilterChange}
          placeholder="Filter by tags (comma-separated)"
          className="filter-input"
        />

        <select
          value={sortOption}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="createTime">Creation Time</option>
          <option value="updateTime">Update Time</option>
          <option value="tags">Number of Tags</option>
          <option value="difficulty">Difficulty</option>
        </select>

        <button onClick={applyFilters} className="apply-button">Apply Filters</button>
        <button onClick={clearFilters} className="clear-button">Clear Filters</button>
      </div>
    </div>
  );
};

export default FilterRecipes;
