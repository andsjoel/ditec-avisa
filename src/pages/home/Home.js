import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './home.css';

const Home = () => {
  return (
    <div id='home-container'>
      <Sidebar />
      <section className="home-content">
        <h1>Bem-vindo ao DITEC Avisa</h1>
        <p>Escolha uma das opções no menu para continuar.</p>
      </section>
    </div>
  );
};

export default Home;
