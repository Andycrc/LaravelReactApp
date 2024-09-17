import React, { useState } from 'react';

const RecipeSearch = () => {
  const [userQuery, setUserQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const ID = 'c8d830f0';
  const KEY = '596f1f66ca3f039412fca8ab6532df08';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${userQuery}&app_id=${ID}&app_key=${KEY}`;
      const response = await fetch(baseURL);
      const data = await response.json();
      setSearchResults(data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for recipes"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="">
        {searchResults.map((result, index) => (
          <div key={index} className="col-md-12">
            <div className="">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-12">
                  <div className="card">
                    <div>
                      <div className="thumbnail">
                      <img
                        className="left"
                        src={result.recipe.image}
                        alt="Recipe Thumbnail"
                        style={{
                          width: '100%', // Ancho de la imagen
                          height: '100%',
                          transform: 'scale(0.9)', // Alto de la imagen
                         
                        }}
                      />

                      
                      </div>
                      
                      <div>
                        <h1 className="right mt-3 text-center">{result.recipe.label}</h1>
                        <hr className="right" style={{ border: '1px solid #b4b1b1' }} />
                      </div>

                      <div className="right">
                        <h5>Ingredients:</h5>
                        <div className="ingredient-list">
                          {result.recipe.ingredientLines.map((ingredient, i) => (
                            <p key={i}>{ingredient}</p>
                          ))}
                        </div>
                      </div>

                    </div>
                    <div className="px-4 m-1">
                      <h3 className='mb-3'>Datos:</h3>
                      <div className="d-flex mt-1">
                        <p><strong>Calories:</strong> <span>{result.recipe.calories.toFixed(2)}</span></p>
                        <p className='px-3'><strong>Tipo de comida:</strong> <span>{result.recipe.mealType}</span></p>
                        <p><strong>precauciones:</strong> <span>{result.recipe.cautions}</span></p>
                        
                      </div>
                      <div className='d-flex mt-2'>
                      <p><strong>Tiempo de preparación:</strong> <span>{result.recipe.totalTime}</span> min</p>
                      <p className='px-3'><strong>Porciones:</strong> <span>{result.recipe.yield}</span></p>
                      </div>
                      <div className='text-end px-3 mb-3'>
                      <a href={result.recipe.url} className="btn btn-primary">Visitar receta</a>
                      </div>
                      
                    </div>

                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
