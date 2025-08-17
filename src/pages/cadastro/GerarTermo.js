import React, { useState } from 'react';
import FormatacaoForm from './forms/FormatacaoForm';
import GarantiaForm from './forms/GarantiaForm';
import InstalacaoForm from './forms/InstalcaoForm';

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
          <button onClick={() => setOpcaoSelecionada('instalar')}>
            Gerar Termo de Instalação
          </button>
        </div>
      ) : (
        <>
          <div className="termo-header">
            <button className="voltar-button" onClick={handleVoltar}>
              ← Voltar
            </button>
            {/* <h2>
              {opcaoSelecionada === 'backup'
                ? 'Gerar Termo de Backup'
                : 'Gerar Termo de Garantia'}
            </h2> */}
          </div>

          {opcaoSelecionada === 'backup' && <FormatacaoForm />}
          {opcaoSelecionada === 'garantia' && <GarantiaForm />}
          {opcaoSelecionada === 'instalar' && <InstalacaoForm />}
        </>
      )}
    </div>
  );
};

export default GerarTermo;
