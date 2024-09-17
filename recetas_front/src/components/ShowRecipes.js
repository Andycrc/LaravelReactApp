import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const ShowRecipes = () => {

  
  const [show, setShow] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipe_id, setRecipeId] = useState(0);
  const [ingredient_name, setIngredientName] = useState('');
  const [quantity, setQuantity] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIngredientId, setEditIngredientId] = useState(null);
  const [editIngredientName, setEditIngredientName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  const openEditModal = (ingredientId) => {
    const ingredientToEdit = ingredientes.find((ingrediente) => ingrediente.id === ingredientId);
    if (ingredientToEdit) {
      setEditIngredientId(ingredientToEdit.id);
      setRecipeId(ingredientToEdit.recipe_id);
      setEditIngredientName(ingredientToEdit.ingredient_name);
      setEditQuantity(ingredientToEdit.quantity);
      setEditModalOpen(true);
    }
  };
  

  const handleClose = () => setShow(false);

  const handleShow = (recipeId) => {
    setRecipeId(recipeId);
    setShow(true);
  };

  const DeleteRecipe = async (id) => {
    try {
      await axios.delete(`${endpoint}/recipe/${id}`);
      getAllRecipes();
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
    }
  };

  const endpoint2 = 'http://localhost:8000/api/ingredient';

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(endpoint2, { recipe_id, ingredient_name, quantity });
      console.log('Respuesta de la solicitud:', response.data);
      handleClose();
      setIngredientName('');
      setQuantity('');
      getAllIngredientes();
    } catch (error) {
      console.error('Error al agregar el ingrediente:', error);
    }
  };

  const editIngredient = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${endpoint2}/${editIngredientId}`, {
        recipe_id,
        ingredient_name: editIngredientName,
        quantity: editQuantity,
      });
      console.log('Respuesta de la solicitud de edición:', response.data);
      setEditModalOpen(false);
      setEditIngredientName('');
      setEditQuantity('');
      getAllIngredientes();
    } catch (error) {
      console.error('Error al editar el ingrediente:', error);
    }
  };

  const endpoint3 = 'http://localhost:8000/api';
  const [ingredientes, SetIngredientes] = useState([]);

  const getAllRecipes = async () => {
    const response = await axios.get(`${endpoint}/recipes`);
    setRecipes(response.data);
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllIngredientes = async () => {
    try {
      const response = await axios.get(`${endpoint3}/ingredients`);
      console.log('Datos de ingredientes recibidos:', response.data);
      SetIngredientes(response.data);
    } catch (error) {
      console.error('Error al obtener ingredientes:', error);
    }
  };

  useEffect(() => {
    getAllIngredientes();
  }, []);

  const DeleteIngredients = async (id) => {
    try {
      await axios.delete(`${endpoint3}/ingredient/${id}`);
      getAllIngredientes();
    } catch (error) {
      console.error('Error al eliminar el ingrediente:', error);
    }
  };

  return (
    <div>
      {recipes.map((recipe) => (
        <div className="container" key={recipe.id}>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-12">
              <div className="card">
                <div>
                  <div className="thumbnail">
                    <img src={`http://localhost:8000/${recipe.image}`} alt="Recipe Image" className="recipe-image" style={{
                          width: '100%', // Ancho de la imagen
                          height: '100%',
                          transform: 'scale(0.9)', // Alto de la imagen
                         
                        }} />
                  </div>
                  <div>
                    <h1 className="right mt-3 text-center">{recipe.recipe_name}</h1>
                    <hr className="right" style={{ border: '1px solid #b4b1b1' }} />
                  </div>
                  <div className="right">
                    <p>Ingredientes:</p>
                    <div className="ingredient-list2">
                      <table className="table table-borderless">
                        <tbody >
                          {ingredientes
                            .filter((ingrediente) => ingrediente.recipe_id === recipe.id)
                            .map((ingrediente) => (
                              <tr key={ingrediente.id} >
                                <td >{ingrediente.quantity + ' - ' + ingrediente.ingredient_name}</td>
                                <td >
                                  <button onClick={() => openEditModal(ingrediente.id)} className="btn btn-primary">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                    </svg>
                                  </button>
                                  {' '}
                                  <button
                                    onClick={() => DeleteIngredients(ingrediente.id)}
                                    className="btn btn-danger"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-trash"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center mb-4 mt-3">
                      <Button variant="primary" onClick={() => handleShow(recipe.id)}>
                        Agregar Ingrediente
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <p>Descripcion: {recipe.description}</p>
                </div>
                <div className="p-3">
                  <button onClick={() => DeleteRecipe(recipe.id)} className="btn btn-danger">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Ingrediente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={store}>
            <div className="mb-3">
              <label className="form-label">Id</label>
              <input
                value={recipe_id}
                onChange={(e) => setRecipeId(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ingrediente</label>
              <input
                value={ingredient_name}
                onChange={(e) => setIngredientName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ingrediente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editIngredient}>
            <div className="mb-3">
              <label className="form-label">Id</label>
              <input
                value={recipe_id}
                onChange={(e) => setRecipeId(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ingrediente</label>
              <input
                value={editIngredientName}
                onChange={(e) => setEditIngredientName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Editar
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowRecipes;
