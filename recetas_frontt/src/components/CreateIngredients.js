import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const endpoint = 'http://localhost:8000/api/ingredients';

const CreateIngredients = ({ showModal, closeModal }) => {
  const [recipe_id, setRecipeId] = useState(0);
  const [ingredient_name, setIngredientName] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    await axios.post(endpoint, { recipe_id, ingredient_name, quantity });
    navigate('/');
    closeModal(); // Cierra el modal después de guardar los cambios
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Ingrediente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={store}>
          <div className='mb-3'>
            <label className='form-label'>id</label>
            <input
                value={recipe_id}
                onChange={(e) => setRecipeId(e.target.value)}
                type="text"
                className="form-control"
              />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Ingrediente</label>
            <input
              value={ingredient_name}
              onChange={(e) => setIngredientName(e.target.value)}
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Cantidad</label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='form-control'
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Agregar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const YourComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Mostrar Modal de Crear Ingrediente
      </Button>

      <CreateIngredients showModal={showModal} closeModal={handleClose} />
    </>
  );
};

export default YourComponent;