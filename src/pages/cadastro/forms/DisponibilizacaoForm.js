import React, { useState } from 'react';
import './disponibilizacao-form.css';

const mockDatabase = {
  '123456': {
    nome: 'João da Silva',
    email: 'joao.silva@example.com',
    unidade: 'DITEC/SIS/SST',
  },
};

const equipamentoOptions = ['Desktop', 'Laptop', 'Mouse', 'Teclado', 'Monitor', 'HD', 'SSD'];

const DisponibilizacaoForm = () => {
  const [matricula, setMatricula] = useState('');
  const [dados, setDados] = useState(null);
  const [emails, setEmails] = useState([]);
  const [chamadoNumero, setChamadoNumero] = useState('');
  const [chamadoLink, setChamadoLink] = useState('');
  const [patrimonio, setPatrimonio] = useState('');
  const [equipamento, setEquipamento] = useState('');
  const [dataAtual] = useState(new Date().toLocaleDateString());
  const [observacao, setObservacao] = useState('Nota 1. Marca / Modelo:\nNota 2. Descrição:');

  const handleBuscar = () => {
    const info = mockDatabase[matricula];
    if (info) {
      setDados({ ...info, matricula });
      setEmails([info.email]);  // Preenche o e-mail com o e-mail do mock
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
      chamadoNumero.trim() !== '' &&
      chamadoLink.trim() !== '' &&
      patrimonio.trim() !== '' &&
      equipamento.trim() !== '' &&
      emails.every((e) => e.trim() !== '') // Todos os emails devem ser válidos
    );
  };

  return (
    <>
      <div className="form-disponibilizacao">
        <h2>Disponibilização de Equipamento</h2>
        <p>Preencha a matrícula para quem será disponibilizado o Equipamento, em seguida preencha os dados necesários para cadastrar a Disponibilização no sistema da DITEC Avisa.</p>

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
            <div className="form-disponibilizacao">
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
                    readOnly={index === 0} // O primeiro e-mail é sempre somente leitura
                  />
                  {index !== 0 && emails.length > 1 && (
                    <button type="button" onClick={() => handleRemoveEmail(index)}>-</button>
                  )}
                  {index === emails.length - 1 && (
                    <button type="button" onClick={handleAddEmail}>+</button>
                  )}
                </div>
              ))}

              <label>Chamado nº:</label>
              <input
                type="text"
                value={chamadoNumero}
                onChange={(e) => setChamadoNumero(e.target.value)}
              />

              <label>Link do Chamado:</label>
              <input
                type="text"
                value={chamadoLink}
                onChange={(e) => setChamadoLink(e.target.value)}
              />

              <label>Patrimônio nº:</label>
              <input
                type="text"
                value={patrimonio}
                onChange={(e) => setPatrimonio(e.target.value)}
              />

              <label>Equipamento:</label>
              <select
                value={equipamento}
                onChange={(e) => setEquipamento(e.target.value)}
              >
                <option value="">Selecione</option>
                {equipamentoOptions.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-right">
            <div className="form-disponibilizacao">
              <label>Título:</label>
              <input
                type="text"
                readOnly
                value={`[LAB][DISPONÍVEL] ${equipamento || '___'} - Pat. ${patrimonio || '_____'} `}
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

            <div className="form-disponibilizacao">
              <button
                disabled={!isFormularioValido()}
                className="submit-button"
                onClick={() => alert('Equipamento registrado com sucesso!')}
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

export default DisponibilizacaoForm;
