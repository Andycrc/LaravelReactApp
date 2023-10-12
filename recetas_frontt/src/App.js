import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ShowRecipes from './components/ShowRecipes';
import CreateRecipes from './components/CreateRecipes';
import EditRecipes from './components/EditRecipes';
import Navbar from './components/Navbar';
import CreateIngredients from './components/CreateIngredients';
import ApiRecipe from './components/ApiRecipe';

function App() {
  const [contentVisible, setContentVisible] = useState(false);

  // Función para mostrar el contenido principal al hacer clic en un enlace
  const showContent = () => {
    setContentVisible(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onLinkClick={showContent} />
        <div className="container">
          <Routes>
            <Route path='/API' element={<ApiRecipe />} />
            <Route path='/show' element={<ShowRecipes />} />
            <Route path='/create' element={<CreateRecipes />} />
            <Route path='/edit/:id' element={<EditRecipes />} />
            <Route path='/create2' element={<CreateIngredients />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
