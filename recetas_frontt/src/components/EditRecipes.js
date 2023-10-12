import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/recipe';

const EditRecipes = () => {
  const [recipe_name, setRecipe_name] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();

    try {
      // Agrega console.log para verificar los datos antes de enviar la solicitud
      console.log('Datos antes de la solicitud:', {
        recipe_name: recipe_name,
        description: description,
        image: image,
      });

      const formData = new FormData();
      formData.append('recipe_name', recipe_name);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      await axios.put(`${endpoint}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Agrega un console.log para verificar la respuesta
      console.log('Receta actualizada con éxito');

      navigate('/');
    } catch (error) {
      // Maneja cualquier error de la solicitud Axios
      console.error('Error en la solicitud de actualización:', error);

      // Puedes agregar un mensaje de error personalizado si lo deseas
      alert('Error al actualizar la receta. Por favor, intenta de nuevo más tarde.');
    }
  };

  useEffect(() => {
    const getRecipesById = async () => {
      try {
        const response = await axios.get(`${endpoint}/${id}`);
        setRecipe_name(response.data.recipe_name);
        setDescription(response.data.description);
        setImage(null);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
        // Puedes manejar este error de acuerdo a tus necesidades
      }
    };
    getRecipesById();
  }, [id]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div>
      <h3>Actualizar Receta</h3>
      <form onSubmit={update}>
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
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Nueva Imagen</label>
          <input
            type='file'
            onChange={handleImageChange}
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditRecipes;
