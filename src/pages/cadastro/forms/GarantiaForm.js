import React, { useState } from 'react';
import './garantia-form.css';

const mockDatabase = {
  '123456': {
    nome: 'João da Silva',
    email: 'joao.silva@example.com',
    unidade: 'DITEC/SIS/SST',
  },
};

const tipoGarantiaOptions = ['Garantia Técnica', 'Garantia de Peça', 'Garantia Estendida'];

const GarantiaForm = () => {
  const [matricula, setMatricula] = useState('');
  const [dados, setDados] = useState(null);
  const [emails, setEmails] = useState([]);
  const [numeroGarantia, setNumeroGarantia] = useState('');
  const [tipoGarantia, setTipoGarantia] = useState('');
  const [patrimonio, setPatrimonio] = useState('');
  const [dataAtual] = useState(new Date().toLocaleDateString());
  const [observacao, setObservacao] = useState('Descrição da Garantia...');

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
    return (
      dados &&
      numeroGarantia.trim() !== '' &&
      tipoGarantia.trim() !== '' &&
      patrimonio.trim() !== '' &&
      emails.every((e) => e.trim() !== '')
    );
  };

  return (
    <>
      <div className="form-garantia">
        <h2>Cadastro de Garantia</h2>
        <p>Preencha a matrícula do solicitante e os dados necessários para registrar a garantia.</p>

        <label>Matrícula:</label>
        <input
          className="input-mat"
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        {!dados && (
          <button className="input-mat" onClick={handleBuscar}>Avançar</button>
        )}
      </div>

      {dados && (
        <div className="form-container">
          <div className="form-left">
            <div className="form-garantia">
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
                    onChange={(e) => handleEmailChange(e.target.value, index)}
                    readOnly={index === 0} // Primeiro email só leitura
                  />
                  {index !== 0 && emails.length > 1 && (
                    <button type="button" onClick={() => handleRemoveEmail(index)}>-</button>
                  )}
                  {index === emails.length - 1 && (
                    <button type="button" onClick={handleAddEmail}>+</button>
                  )}
                </div>
              ))}

              <label>Número da Garantia:</label>
              <input
                type="text"
                value={numeroGarantia}
                onChange={(e) => setNumeroGarantia(e.target.value)}
              />

              <label>Tipo de Garantia:</label>
              <select
                value={tipoGarantia}
                onChange={(e) => setTipoGarantia(e.target.value)}
              >
                <option value="">Selecione</option>
                {tipoGarantiaOptions.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>

              <label>Patrimônio nº:</label>
              <input
                type="text"
                value={patrimonio}
                onChange={(e) => setPatrimonio(e.target.value)}
              />
            </div>
          </div>

          <div className="form-right">
            <div className="form-garantia">
              <label>Título:</label>
              <input
                type="text"
                readOnly
                value={`[LAB][GARANTIA] ${tipoGarantia || '___'} - Pat. ${patrimonio || '_____'}`}
              />

              <label>Data:</label>
              <input type="text" value={dataAtual} readOnly />

              <label>Observação:</label>
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows="4"
              />
            </div>

            <div className="form-garantia">
              <button
                disabled={!isFormularioValido()}
                className="submit-button"
                onClick={() => alert('Garantia registrada com sucesso!')}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GarantiaForm;
