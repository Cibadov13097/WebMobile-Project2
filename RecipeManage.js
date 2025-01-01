import React, { useState, useEffect } from 'react';
import './RecipeManage.css'; // Optional: Add styles for the form

const RecipeManage = ({ onAddRecipe, onEditRecipe, initialRecipe }) => {
  const [showForm, setShowForm] = useState(false);
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    tags: '',
    difficulty: '',
  });

  useEffect(() => {
    if (initialRecipe) {
      setRecipeData({
        title: initialRecipe.title || '',
        description: initialRecipe.description || '',
        ingredients: initialRecipe.ingredients?.join(', ') || '',
        steps: initialRecipe.steps?.join('. ') || '',
        tags: initialRecipe.tags?.join(', ') || '',
        difficulty: initialRecipe.difficulty || '',
      });
      setShowForm(true);
    }
  }, [initialRecipe]);

  const toggleForm = () => {
    if (showForm && !initialRecipe) {
      setRecipeData({
        title: '',
        description: '',
        ingredients: '',
        steps: '',
        tags: '',
        difficulty: '',
      });
    }
    setShowForm(!showForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedRecipe = {
      ...recipeData,
      ingredients: recipeData.ingredients.split(',').map((item) => item.trim()),
      steps: recipeData.steps.split('.').map((item) => item.trim()).filter(Boolean),
      tags: recipeData.tags.split(',').map((item) => item.trim()),
      lastUpdated: new Date().toISOString(),
      createTime: initialRecipe ? initialRecipe.createTime : new Date().toISOString(),
    };

    if (initialRecipe) {
      // Update existing recipe
      fetch(`http://localhost:5000/recipes/${initialRecipe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedRecipe),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update the recipe');
          }
          return response.json();
        })
        .then((updatedRecipe) => {
          onEditRecipe(updatedRecipe); // Notify parent component about the update
          setShowForm(false);
        })
        .catch((error) => {
          console.error('Error updating recipe:', error);
        });
    } else {
      // Add new recipe
      fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedRecipe),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to save the recipe');
          }
          return response.json();
        })
        .then((savedRecipe) => {
          onAddRecipe(savedRecipe); // Update state in parent component
          setShowForm(false);
        })
        .catch((error) => {
          console.error('Error saving recipe:', error);
        });
    }
  };

  return (
    <div className="recipe-manage">
      {!showForm && (
        <button onClick={toggleForm} className="dropdown-button">
          {initialRecipe ? 'Edit Recipe' : 'Add Recipe'}
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="recipe-form">
          {initialRecipe && (
            <p>
              <strong>Created Time:</strong>{' '}
              {new Date(initialRecipe.createTime).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </p>
          )}
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            placeholder="Recipe Title"
            required
          />
          <textarea
            name="description"
            value={recipeData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <textarea
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma-separated)"
            required
          />
          <textarea
            name="steps"
            value={recipeData.steps}
            onChange={handleChange}
            placeholder="Steps (period-separated)"
            required
          />
          <input
            type="text"
            name="tags"
            value={recipeData.tags}
            onChange={handleChange}
            placeholder="Tags (comma-separated)"
          />
          <select
            name="difficulty"
            value={recipeData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <button type="submit" className="submit-button">
            {initialRecipe ? 'Update Recipe' : 'Add Recipe'}
          </button>
          <button onClick={toggleForm} type="button" className="cancel-button">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default RecipeManage;
