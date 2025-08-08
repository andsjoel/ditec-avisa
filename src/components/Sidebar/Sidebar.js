import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faLaptop, faUsers } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">DITEC Avisa</h2>
      <nav className="sidebar-nav">
        <NavLink to="/cadastro" className="nav-item">
          <FontAwesomeIcon icon={faSquarePlus} className="nav-icon" />
          Cadastro
        </NavLink>
        <NavLink to="/equipamentos" className="nav-item">
          <FontAwesomeIcon icon={faLaptop} className="nav-icon" />
          Equipamentos
        </NavLink>
        <NavLink to="/interno" className="nav-item">
          <FontAwesomeIcon icon={faUsers} className="nav-icon" />
          Interno
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
