import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLinkClick }) => {
  // Esta función llama a la función onLinkClick pasada como prop
  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
          <li className="nav-item">
            
              <Link
                className="nav-link active"
                to="/API"
                onClick={handleLinkClick}
                >                  
                Home
              </Link>
            </li>
            
            <li className="nav-item">
            <Link
                className="nav-link active"
                to="/create"
                onClick={handleLinkClick}
                >
                Nueva Receta
              </Link>
              
              
            </li>
            <li className="nav-item">
            <Link
                className="nav-link active"
                to="/show"
                onClick={handleLinkClick}
                >
                ver Recetas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
