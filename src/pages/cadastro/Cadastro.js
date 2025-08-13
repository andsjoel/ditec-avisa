import React, { useState } from 'react';
import './cadastro.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import GerarTermo from './GerarTermo';
import DisponibilizacaoForm from './forms/DisponibilizacaoForm';

const Cadastro = () => {
  const [selectedNav, setSelectedNav] = useState('gerar-termo');

  return (
    <div className="cadastro-container">
      <Sidebar />
      <main className="cadastro-content">
        <nav className="side-nav">
          <h2>Cadastro</h2>
          <ul>
            <li
              className={selectedNav === 'gerar-termo' ? 'active' : ''}
              onClick={() => setSelectedNav('gerar-termo')}
            >
              Gerar Termo
            </li>
            <li
              className={selectedNav === 'disponibilizacao' ? 'active' : ''}
              onClick={() => setSelectedNav('disponibilizacao')}
            >
              Disponibilização
            </li>
            <li
              className={selectedNav === 'garantia' ? 'active' : ''}
              onClick={() => setSelectedNav('garantia')}
            >
              Garantia
            </li>
          </ul>
        </nav>

        <section className="form-render-area">
          {selectedNav === 'gerar-termo' && <GerarTermo />}
          {selectedNav === 'disponibilizacao' && <DisponibilizacaoForm />}
          {selectedNav === 'garantia' && (
            <div>
              <p>Formulário Garantia (em desenvolvimento)</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Cadastro;
