import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeManage from "./RecipeManage";
import "./RecipesPage.css";
import SearchRecipe from "./SearchRecipe";
import FilterRecipes from "./FilterRecipes";
import Navbar from "./Navbar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";



const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [expandedIndexIngredients, setExpandedIndexIngredients] = useState(null);
  const [expandedIndexSteps, setExpandedIndexSteps] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 16;
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search")?.toLowerCase();

    if (searchQuery) {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery) ||
          recipe.description.toLowerCase().includes(searchQuery) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchQuery)
          )
      );
      setFilteredRecipes(filtered);
    }
  }, [location.search, recipes]);

  const toggleDropdownIngredients = (index) => {
    setExpandedIndexIngredients(expandedIndexIngredients === index ? null : index);
  };

  const toggleDropdownSteps = (index) => {
    setExpandedIndexSteps(expandedIndexSteps === index ? null : index);
  };

  const handleSelectRecipe = (id) => {
    setSelectedRecipes((prev) =>
      prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
    );
  };

  const shareRecipes = () => {
    const recipesToShare = recipes.filter((recipe) => selectedRecipes.includes(recipe.id));
    const recipesJSON = JSON.stringify(recipesToShare, null, 2);

    const emailSubject = encodeURIComponent("Shared Recipes");
    const emailBody = encodeURIComponent(`Here are the selected recipes:\n\n${recipesJSON}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${emailSubject}&body=${emailBody}`;

    window.open(gmailUrl, "_blank");
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowPopup(true);
  };

  const handleAddRecipe = () => {
    setEditingRecipe(null);
    setShowPopup(true);
  };

  const closePopup = () => {
    setEditingRecipe(null);
    setShowPopup(false);
  };

  const handleRecipeUpdate = (updatedRecipe) => {
    const currentTime = new Date().toISOString();
    updatedRecipe.updateTime = currentTime;

    if (editingRecipe) {
      setRecipes((prev) =>
        prev.map((recipe) => (recipe.id === updatedRecipe.id ? { ...updatedRecipe } : recipe))
      );
      setFilteredRecipes((prev) =>
        prev.map((recipe) => (recipe.id === updatedRecipe.id ? { ...updatedRecipe } : recipe))
      );
    } else {
      updatedRecipe.createTime = currentTime;
      setRecipes((prev) => [...prev, updatedRecipe]);
      setFilteredRecipes((prev) => [...prev, updatedRecipe]);
    }
    closePopup();
  };

  const handleDragAndDrop = (result) => {
    const { source, destination } = result;
  
    // Check if there is a valid destination
    if (!destination || source.index === destination.index) return;
  
    // Swap the recipes based on their positions
    const updatedRecipes = Array.from(filteredRecipes);
    const [movedRecipe] = updatedRecipes.splice(source.index, 1);
    updatedRecipes.splice(destination.index, 0, movedRecipe);
  
    setFilteredRecipes(updatedRecipes);
  };
  
  const [draggingIndex, setDraggingIndex] = useState(null);

const handleDragStart = (index) => {
  setDraggingIndex(index);
};

const handleDragOver = (index) => {
  if (draggingIndex !== index) {
    setDraggingIndex(index);
  }
};

const handleDragEnd = () => {
  setDraggingIndex(null);
};


  const deleteRecipe = (recipeId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this recipe?");

    if (!userConfirmed) return;

    fetch(`http://localhost:5000/recipes/${recipeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete recipe");
        }
        setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
        setFilteredRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
    
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredRecipes.length / recipesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const getCurrentPageRecipes = () => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    return filteredRecipes.slice(startIndex, endIndex);
  };
  
  {getCurrentPageRecipes().map((recipe, index) => (
    <Draggable
      draggableId={recipe.id.toString()}
      index={index}
      key={recipe.id}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`recipe-card ${
            snapshot.isDragging ? "dragging" : ""
          } ${draggingIndex === index ? "drag-over" : ""}`}
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
        >
          <input
            type="checkbox"
            checked={selectedRecipes.includes(recipe.id)}
            onChange={() => handleSelectRecipe(recipe.id)}
          />
          <h2>{recipe.title}</h2>
          <p>
            <strong>Description:</strong> {recipe.description}
          </p>
          <button
            onClick={() => toggleDropdownIngredients(index)}
            className="ingredients-button"
          >
            {expandedIndexIngredients === index
              ? "Hide Ingredients"
              : "View Ingredients"}
          </button>
          {expandedIndexIngredients === index && (
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          )}
          <button
            onClick={() => toggleDropdownSteps(index)}
            className="steps-button"
          >
            {expandedIndexSteps === index ? "Hide Steps" : "View Steps"}
          </button>
          {expandedIndexSteps === index && (
            <ol className="steps-list">
              {recipe.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          )}
          <p>
            <strong>Tags:</strong> {recipe.tags.join(", ")}
          </p>
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(recipe.createTime).toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(recipe.lastUpdated).toLocaleString()}
          </p>
          <button
            onClick={() => handleEditRecipe(recipe)}
            className="edit-button"
          >
            Edit Recipe
          </button>
          <button
            onClick={() => deleteRecipe(recipe.id)}
            className="delete-button"
          >
            Delete Recipe
          </button>
        </div>
      )}
    </Draggable>
  ))}
  

  const clearAllCheckboxes = () => {
    setSelectedRecipes([]);
  };

  return (
    <>
      <Navbar />
      <div className="recipes-page">
        <div className="search">
          <h2>Search</h2>
          <SearchRecipe
            recipes={recipes}
            onSearchResults={(results) => {
              setFilteredRecipes(results);
              setCurrentPage(1);
            }}
          />
        </div>

        <FilterRecipes
          recipes={recipes}
          onFilterResults={(results) => {
            setFilteredRecipes(results);
            setCurrentPage(1);
          }}
        />

        <h1 style={{ color: "black" }}>Recipes</h1>

        <button onClick={handleAddRecipe} className="add-recipe-button">
          Add Recipe
        </button>

        {selectedRecipes.length > 0 && (
          <>
            <div className="floating-share-button">
              <button onClick={shareRecipes}>
                <i className="fas fa-envelope"></i> Share Selected Recipes
              </button>
            </div>
            <button onClick={clearAllCheckboxes} className="clear-checkbox-button">
              Clear All
            </button>
          </>
        )}

<DragDropContext onDragEnd={handleDragAndDrop}>
  <Droppable droppableId="ROOT" direction="horizontal">
    {(provided) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        className="recipe-cards"
      >
        {getCurrentPageRecipes().map((recipe, index) => (
          <Draggable
            draggableId={recipe.id.toString()}
            index={index}
            key={recipe.id}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="recipe-card"
              >
                <input
                  type="checkbox"
                  checked={selectedRecipes.includes(recipe.id)}
                  onChange={() => handleSelectRecipe(recipe.id)}
                />
                <h2>{recipe.title}</h2>
                <p>
                  <strong>Description:</strong> {recipe.description}
                </p>
                <button
                  onClick={() => toggleDropdownIngredients(index)}
                  className="ingredients-button"
                >
                  {expandedIndexIngredients === index
                    ? "Hide Ingredients"
                    : "View Ingredients"}
                </button>
                {expandedIndexIngredients === index && (
                  <ul className="ingredients-list">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => toggleDropdownSteps(index)}
                  className="steps-button"
                >
                  {expandedIndexSteps === index ? "Hide Steps" : "View Steps"}
                </button>
                {expandedIndexSteps === index && (
                  <ol className="steps-list">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                )}
                <p>
                  <strong>Tags:</strong> {recipe.tags.join(", ")}
                </p>
                <p>
                  <strong>Difficulty:</strong> {recipe.difficulty}
                </p>
                <p>
                  <strong>Created:</strong> {new Date(recipe.createTime).toLocaleString()}
                </p>
                <p>
                  <strong>Last Updated:</strong> {new Date(recipe.lastUpdated).toLocaleString()}
                </p>
                <button
                  onClick={() => handleEditRecipe(recipe)}
                  className="edit-button"
                >
                  Edit Recipe
                </button>
                <button
                  onClick={() => deleteRecipe(recipe.id)}
                  className="delete-button"
                >
                  Delete Recipe
                </button>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>

    
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(filteredRecipes.length / recipesPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredRecipes.length / recipesPerPage)}
          >
            Next
          </button>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <RecipeManage
                initialRecipe={editingRecipe}
                onEditRecipe={handleRecipeUpdate}
                onAddRecipe={handleRecipeUpdate}
              />
              <button onClick={closePopup} className="close-popup">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipesPage;