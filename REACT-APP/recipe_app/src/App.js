import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MyContextProvider } from './MyContext';
import HomePage from './HomePage';
import RecipesPage from './RecipesPage';
import ContactPage from './ContactPage';

const App = () => {
  return (
    <MyContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* Dynamic route */}
        </Routes>
      </Router>
    </MyContextProvider>
  );
};

export default App;
