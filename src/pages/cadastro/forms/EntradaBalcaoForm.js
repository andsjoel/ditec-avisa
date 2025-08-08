import React, { useState } from 'react';
import './entrada-balcao-form.css';

const mockDatabase = {
  '123456': {
    nome: 'João da Silva',
    email: 'joao.silva@example.com',
    unidade: ' DITEC/SIS/SST',
  },
};

const EntradaBalcaoForm = () => {
  const [matricula, setMatricula] = useState('');
  const [dados, setDados] = useState(null);
  const [emails, setEmails] = useState([]);
  const [patrimonio, setPatrimonio] = useState('');
  const [formata, setFormata] = useState(false);
  const [backups, setBackups] = useState([]);
  const [dataAtual] = useState(new Date().toLocaleDateString());
  const [observacao, setObservacao] = useState('Nota 1. Pendente da criação do Chamado.');

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

  const handleAddBackup = () => setBackups([...backups, '']);
  const handleRemoveBackup = (index) => {
    const newBackups = [...backups];
    newBackups.splice(index, 1);
    setBackups(newBackups);
  };

  const handleBackupChange = (value, index) => {
    const newBackups = [...backups];
    newBackups[index] = value;
    setBackups(newBackups);
  };

  const isFormularioValido = () => {
    const hasDados = !!dados;
    const hasEmail = emails.every((e) => e.trim() !== '');
    const hasPatrimonio = patrimonio.trim() !== '';
    const hasBackup = !formata || backups.some((b) => b.trim() !== '');

    return hasDados && hasEmail && hasPatrimonio && hasBackup;
  };

  return (
    <>
      <div className="form-entrada-balcao">
        <h2 className=''>Cadastrar Equipamento para Formatação</h2>
        <p>Preencha a matrícula do Solicitante e depois os dados necessários para gerar o termo de Formatação de Equipamento e pré registrar a máquina no sistema da DITEC Avisa. Faça a impressão do termo e cole o termo junto ao equipamento recebido.</p>
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

        <label>Formatação:</label>
        <div className="radio-options">
          <label>
            <input
              type="radio"
              name="formata"
              value="sem"
              checked={!formata}
              onChange={() => setFormata(false)}
            />
            Sem formatação
          </label>
          <label>
            <input
              type="radio"
              name="formata"
              value="com"
              checked={formata}
              onChange={() => {
                setFormata(true);
                if (backups.length === 0) {
                  setBackups(['']);
                }
              }}
            />
            Com formatação
          </label>
        </div>
      </div>

      {formata && (
        <div className="form-entrada-balcao">
          <label>Matrículas para Backup:</label>
          {backups.map((backup, index) => (
            <div key={index} className="dynamic-group">
              <input
                type="text"
                value={backup}
                onChange={(e) => handleBackupChange(e.target.value, index)}
              />
              {backups.length > 1 && (
                <button type="button" onClick={() => handleRemoveBackup(index)}>-</button>
              )}
              {index === backups.length - 1 && (
                <button type="button" onClick={handleAddBackup}>+</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="form-right">
      <div className="form-entrada-balcao">
        <label>Título:</label>
        <input
          type="text"
          readOnly
          value={`[LAB] FORMATAÇÃO ${formata ? 'C/BKP' : 'S/BKP'} - Pat. ${patrimonio || '___'}`}
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

      <div className="form-entrada-balcao">
        <button
          disabled={!isFormularioValido()}
          className="submit-button"
          onClick={() => alert('Termo gerado e cadastro realizado!')}
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

export default EntradaBalcaoForm;
