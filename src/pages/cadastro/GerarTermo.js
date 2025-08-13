import React, { useState } from 'react';
import EntradaBalcaoForm from './forms/EntradaBalcaoForm';
import GarantiaForm from './forms/GarantiaForm';

const GerarTermo = () => {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const handleVoltar = () => {
    const confirmar = window.confirm('Tem certeza que deseja voltar? Todos os dados preenchidos serão perdidos.');
    if (confirmar) {
      setOpcaoSelecionada('');
    }
  };

  return (
    <div className="gerar-termo-container">
      {!opcaoSelecionada ? (
        <div className="opcao-termo-selector">
          <h2>Escolha o tipo de termo a ser gerado:</h2>
          <button onClick={() => setOpcaoSelecionada('backup')}>
            Gerar Termo de Backup
          </button>
          <button onClick={() => setOpcaoSelecionada('garantia')}>
            Gerar Termo de Garantia
          </button>
        </div>
      ) : (
        <>
          <div className="termo-header">
            <button className="voltar-button" onClick={handleVoltar}>
              ← Voltar
            </button>
            <h2>
              {opcaoSelecionada === 'backup'
                ? 'Gerar Termo de Backup'
                : 'Gerar Termo de Garantia'}
            </h2>
          </div>

          {opcaoSelecionada === 'backup' && <EntradaBalcaoForm />}
          {opcaoSelecionada === 'garantia' && <GarantiaForm />}
        </>
      )}
    </div>
  );
};

export default GerarTermo;
