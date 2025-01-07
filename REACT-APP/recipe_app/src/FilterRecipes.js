import React, { useState } from 'react';
import './FilterRecipes.css';

// Function to sort by update date (new to old)
export const sortByUpdateDate = (recipes) => {
  if (!recipes || recipes.length === 0) {
    return [];
  }

  return [...recipes].sort((a, b) => {
    const dateA = new Date(a.lastUpdated);
    const dateB = new Date(b.lastUpdated);
    return dateB - dateA; // Descending order (new to old)
  });
};

// Function to sort by creation date (old to new)
export const sortByCreateDate = (recipes) => {
  if (!recipes || recipes.length === 0) {
    return [];
  }

  return [...recipes].sort((a, b) => {
    const dateA = new Date(a.createTime);
    const dateB = new Date(b.createTime);
    return dateA - dateB; // Ascending order (old to new)
  });
};

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
      onFilterResults([]);
      return;
    }

    let filteredRecipes = recipes;

    // Filter by difficulty
    if (filters.difficulty) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.difficulty === filters.difficulty
      );
    }

    // Filter by tags
    if (filters.tags) {
      const tagsArray = filters.tags.toLowerCase().split(',').map((tag) => tag.trim());

      filteredRecipes = filteredRecipes.filter((recipe) => {
        const recipeTags = recipe.tags.map((t) => t.toLowerCase().trim());
        return tagsArray.some((tag) => recipeTags.includes(tag));
      });
    }

    // Apply sorting
    if (sortOption === 'updateTime') {
      filteredRecipes = sortByUpdateDate(filteredRecipes);
    } else if (sortOption === 'createTime') {
      filteredRecipes = sortByCreateDate(filteredRecipes);
    } else if (sortOption === 'title') {
      filteredRecipes = [...filteredRecipes].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'difficulty') {
      const difficultyOrder = ['Easy', 'Medium', 'Hard'];
      filteredRecipes = [...filteredRecipes].sort(
        (a, b) => difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty)
      );
    }

    onFilterResults(filteredRecipes);
  };

  const clearFilters = () => {
    setFilters({ difficulty: '', tags: '' });
    setSortOption('');
    onFilterResults(recipes);
  };

  return (
    <div className="filter-recipes">
      <h2>Filter Recipes</h2>
      <div className="filter-controls">
        {/* Filter by Difficulty */}
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

        {/* Filter by Tags */}
        <input
          type="text"
          name="tags"
          value={filters.tags}
          onChange={handleFilterChange}
          placeholder="Filter by tags (comma-separated)"
          className="filter-input"
        />

        {/* Sorting Options */}
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="createTime">Creation Time</option>
          <option value="updateTime">Update Time</option>
          <option value="difficulty">Difficulty</option>
        </select>

        {/* Apply and Clear Buttons */}
        <button onClick={applyFilters} className="apply-button">Apply Filters</button>
        <button onClick={clearFilters} className="clear-button">Clear Filters</button>
      </div>
    </div>
  );
};

export default FilterRecipes;
