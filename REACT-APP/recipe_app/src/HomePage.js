  import React, { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';
  import Navbar from './Navbar';
  import './HomePage.css';

  const HomePage = () => {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/recipes')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch recipes');
          }
          return response.json();
        })
        .then((data) => {
          const shuffledRecipes = data.sort(() => 0.5 - Math.random());
          setFeaturedRecipes(shuffledRecipes.slice(0, 2));
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error);
        });
    }, []);

    const projects = [
      {
        title: 'Project 1: Chrome Extension for Auto Form Filler',
        description: 'A Chrome extension designed to intelligently auto-fill job application and other forms. Features include customizable data fields, profile switching, form field mapping, job application tracking, and history restoring. The extension also supports exporting/importing data and offers an optional automatic cover letter generation feature.',
        link: 'https://github.com/Cibadov13097/WebMobileProject',
      },
    ];

    return (
      <>
        <Navbar />
        <div className="homepage">
          <header className="welcome-section">
            <h1>Welcome to Recipe App!</h1>
            <p>Your one-stop destination for exploring, creating, and enjoying delicious recipes.</p>
            <p>
              This app helps you explore, create, edit, and organize your favorite recipes.
              Whether you are a professional chef or a home cook, you will find it useful!
            </p>
          </header>

          <section className="featured-recipe">
            <h2>Featured Recipes</h2>
            <div className="recipe-cards">
              {featuredRecipes.length > 0 ? (
                featuredRecipes.map((recipe) => (
                  <div className="recipe-card" key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <Link
                      to={`/recipes?search=${encodeURIComponent(recipe.title)}`}
                      className="btn"
                    >
                      View Recipe
                    </Link>
                  </div>
                ))
              ) : (
                <p>Loading featured recipes...</p>
              )}
            </div>
          </section>

          <section className="project-list">
            <h2>Projects from Web and Mobile 1</h2>
            <ul>
              {projects.map((project, index) => (
                <li key={index}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  };

  export default HomePage;
