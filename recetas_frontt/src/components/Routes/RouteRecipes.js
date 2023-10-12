import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from "react";
import ShowRecipes from '../ShowRecipes';
import CreateRecipes from '../CreateRecipes';
import EditRecipes from '../EditRecipes';
import CreateIngredients from '../CreateIngredients';
import ApiRecipe from '../ApiRecipe';

function AppRutas(){
    return (
        <Router>
            <Routes>
              <Route path='/' element={<ApiRecipe />} />
              <Route path='/show' element={<ShowRecipes />} />
              <Route path='/create' element={<CreateRecipes />} />
              <Route path='/edit/:id' element={<EditRecipes />} />
              
              <Route path='/create2' element={<CreateIngredients />} />
            </Routes>
        
        </Router>
    )
        
    
}

export default AppRutas;