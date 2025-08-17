import React, { useState } from 'react';
import './formatacao-form.css'; // Reaproveita o mesmo CSS

const mockDatabase = {
  '123456': {
    nome: 'João da Silva',
    email: 'joao.silva@example.com',
    unidade: 'DITEC/SIS/SST',
  },
};

const InstalacaoForm = () => {
  const [matricula, setMatricula] = useState('');
  const [dados, setDados] = useState(null);
  const [emails, setEmails] = useState([]);
  const [patrimonio, setPatrimonio] = useState('');
  const [hardwareTipo, setHardwareTipo] = useState('');
  const [dataAtual] = useState(new Date().toLocaleDateString());

  const handleBuscar = () => {
    const info = mockDatabase[matricula];
    if (info) {
      setDados({ ...info, matricula });
      setEmails([info.email]);
    } else {
      alert('Matrícula não encontrada.');
    }
  };

  const handleAddEmail = () => setEmails([...emails, '']);
  const handleRemoveEmail = (index) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleEmailChange = (value, index) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const isFormularioValido = () => {
    const hasDados = !!dados;
    const hasEmail = emails.every((e) => e.trim() !== '');
    const hasPatrimonio = patrimonio.trim() !== '';
    const hasUpgrade = hardwareTipo !== '';

    return hasDados && hasEmail && hasPatrimonio && hasUpgrade;
  };

  return (
    <>
      <div className="form-entrada-balcao">
        <h2>Cadastrar Equipamento para Instalação</h2>
        <p>Preencha a matrícula do Solicitante e depois os dados necessários para gerar o termo de Instalação de Hardware e pré registrar a máquina no sistema da DITEC Avisa.</p>

        <label>Matrícula:</label>
        <input
          className='input-mat'
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        {!dados && (
          <button className='input-mat' onClick={handleBuscar}>Avançar</button>
        )}
      </div>

      {dados && (
        <div className="form-container">
          <div className="form-left">
            <div className="form-entrada-balcao">
              <label>Nome:</label>
              <input type="text" value={dados.nome} readOnly />

              <label>Unidade:</label>
              <input type="text" value={dados.unidade} readOnly />

              <label>Emails:</label>
              {emails.map((email, index) => (
                <div key={index} className="dynamic-group">
                  <input
                    type="email"
                    value={email}
                    readOnly={index === 0}
                    onChange={(e) => handleEmailChange(e.target.value, index)}
                  />
                  {index !== 0 && emails.length > 1 && (
                    <button type="button" onClick={() => handleRemoveEmail(index)}>-</button>
                  )}
                  {index === emails.length - 1 && (
                    <button type="button" onClick={handleAddEmail}>+</button>
                  )}
                </div>
              ))}
            </div>

            <div className="form-entrada-balcao">
              <label>Patrimônio nº:</label>
              <input
                type="text"
                value={patrimonio}
                onChange={(e) => setPatrimonio(e.target.value)}
              />

              <label>Tipo de Hardware:</label>
              <select
                value={hardwareTipo}
                onChange={(e) => setHardwareTipo(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="HD">HD</option>
                <option value="SSD">SSD</option>
                <option value="GPU">GPU</option>
                <option value="RAM">RAM</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="form-right">
            <div className="form-entrada-balcao">
              <label>Título:</label>
              <input
                type="text"
                readOnly
                value={
                  `[LAB] Instalar ${hardwareTipo || '___'} - Pat. ${patrimonio || '___'}`
                }
              />

              <label>Data:</label>
              <input type="text" value={dataAtual} readOnly />
            </div>

            <div className="form-entrada-balcao">
              <button
                disabled={!isFormularioValido()}
                className="submit-button"
                onClick={() => alert('Termo de Instalação gerado e cadastro realizado!')}
              >
                Gerar termo e Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstalacaoForm;
