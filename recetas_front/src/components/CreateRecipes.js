import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/recipe';

const CreateRecipes = () => {
  const [recipe_name, setRecipe_name] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Cambiamos a null para almacenar el archivo en lugar de una cadena de texto
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // Obtén el archivo de la entrada de archivo y guárdalo en el estado
    setImage(e.target.files[0]);
  };

  const store = async (e) => {
    e.preventDefault();

    // Crea un objeto FormData para enviar los datos, incluida la imagen
    const formData = new FormData();
    formData.append('recipe_name', recipe_name);
    formData.append('description', description);
    formData.append('image', image);

    // Realiza una solicitud POST con FormData
    await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    navigate('/');
  };

  return (
    <div>
      <h3>Crear Receta</h3>
      <form onSubmit={store}>
        <div className='mb-3'>
          <label className='form-label'>Nombre de la receta</label>
          <input
            value={recipe_name}
            onChange={(e) => setRecipe_name(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Imagen</label>
          <input
            type='file'
            accept='image/*' // Esto limitará la selección solo a archivos de imagen
            onChange={handleImageChange}
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Agregar
        </button>
      </form>
    </div>
  );
};

export default CreateRecipes;
