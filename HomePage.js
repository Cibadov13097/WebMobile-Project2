import React from 'react';
import './HomePage.css'; // Optional: Add CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Welcoming Message and Introduction */}
      <header className="welcome-section">
        <h1>Welcome to Recipe App!</h1>
        <p>Your one-stop destination for exploring, creating, and enjoying delicious recipes.</p>
      </header>

      {/* Featured Recipe Section */}
      <section className="featured-recipe">
        <h2>Featured Recipe</h2>
        <div className="recipe-card">
          <h3>Chocolate Chip Cookies</h3>
          <p>The perfect blend of crispy edges and chewy centers. A treat for all occasions!</p>
          <a href="/recipes/chocolate-chip-cookies" className="btn">
            View Recipe
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2>Projects from Web and Mobile 1 Course</h2>
        <ul className="project-list">
          <li>
            <a href="https://github.com/yourusername/chrome-auto-form-filler" target="_blank" rel="noopener noreferrer">
              Chrome Extension: Intelligent Auto Form Filler
            </a>
            <p>
              This project focuses on creating a Chrome extension to intelligently fill out job applications and other forms. Key features include customizable data fields, profile switching, automatic cover letter generation, and a job application tracking dashboard.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
