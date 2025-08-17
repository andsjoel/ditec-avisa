import React, { useState } from 'react';
import './garantia-form.css';
import gerarDocumento from '../../../utils/GerarDocumento';

const mockDatabase = {
  '123456': {
    nome: 'João da Silva',
    email: 'joao.silva@example.com',
    unidade: 'DITEC/SIS/SST',
  },
};

const defeitoOptions = ['Não liga', 'Desligando', 'Tela piscando', 'Mal funcionamento', 'Outro'];
const equipamentoOptions = ['Mouse', 'Teclado', 'Desktop', 'Monitor', 'Notebook', 'Outro'];

const GarantiaForm = () => {
  const [matricula, setMatricula] = useState('');
  const [dados, setDados] = useState(null);
  const [emails, setEmails] = useState([]);
  const [dataAtual] = useState(new Date().toLocaleDateString());
  const [formatacaoForm, setFormatacaoForm] = useState(null);
  const [matriculasAdicionais, setMatriculasAdicionais] = useState(['']);
  const [requerFormatacao, setRequerFormatacao] = useState(false);

  const [equipamentos, setEquipamentos] = useState([
    { tipo: '', modelo: '', defeito: '', temPatrimonio: true, patrimonio: '', serie: '' },
  ]);

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

  const handleAddEquipamento = () => {
    setEquipamentos([
      ...equipamentos,
      { tipo: '', modelo: '', defeito: '', temPatrimonio: true, patrimonio: '' },
    ]);
  };

  const handleRemoveEquipamento = (index) => {
    const novos = [...equipamentos];
    novos.splice(index, 1);
    setEquipamentos(novos);
  };

  const handleEquipamentoChange = (index, campo, valor) => {
    const novos = [...equipamentos];
    novos[index][campo] = valor;

    if (campo === 'temPatrimonio' && !valor) {
      novos[index].patrimonio = '';
    }

    setEquipamentos(novos);
  };

  const handleMatriculaAdicionalChange = (value, index) => {
    const novas = [...matriculasAdicionais];
    novas[index] = value;
    setMatriculasAdicionais(novas);
  };

  const handleAddMatricula = () => setMatriculasAdicionais([...matriculasAdicionais, '']);
  const handleRemoveMatricula = (index) => {
    const novas = [...matriculasAdicionais];
    novas.splice(index, 1);
    setMatriculasAdicionais(novas);
  };

  const isFormularioValido = () => {
    const hasDados = !!dados;
    const hasEmails = emails.every((e) => e.trim() !== '');
    const hasEquipamentos = equipamentos.every((eq) => {
      if (!eq.tipo.trim() || !eq.modelo.trim() || !eq.defeito.trim()) return false;
      if (eq.temPatrimonio && !eq.patrimonio.trim()) return false;
      return true;
    });

    const formSelecionado = !requerFormatacao || (formatacaoForm === 'com' || formatacaoForm === 'sem');
    const matriculasValidas = !requerFormatacao || formatacaoForm !== 'com' || matriculasAdicionais.every((m) => m.trim() !== '');

    return hasDados && hasEmails && hasEquipamentos && formSelecionado && matriculasValidas;
  };

  const tituloFinal = `[LAB][GARANTIA] ${equipamentos
    .map(eq => {
      const tipo = eq.tipo || '___';
      const modelo = eq.modelo || '___';
      const patr = eq.temPatrimonio && eq.patrimonio.trim() ? ` Pat. ${eq.patrimonio.trim()}` : '';
      return `${tipo} ${modelo}${patr}`;
    })
    .join(' / ')}${requerFormatacao ? ` - ${formatacaoForm === 'com' ? 'C/BKP' : 'S/BKP'}` : ''}`;


  const handleGerarTermoGarantia = () => {
    if (!dados) return alert('Busque uma matrícula primeiro.');

    equipamentos.forEach((equipamento, index) => {
      const titleSuffix = requerFormatacao
        ? formatacaoForm === 'com' ? 'C/BKP' : 'S/BKP'
        : '';

      const title = `[LAB][GARANTIA] ${equipamento.tipo || '___'} ${equipamento.modelo || '___'}${equipamento.temPatrimonio && equipamento.patrimonio ? ` Pat. ${equipamento.patrimonio}` : ''} ${titleSuffix}`;

      gerarDocumento({
        template: 'modelo-garantia.docx',
        nomeArquivo: `termo-garantia-${equipamento.tipo || 'equipamento'}-${index + 1}.docx`,
        data: {
          nome: dados.nome,
          matricula: dados.matricula,
          unidade: dados.unidade,
          patrimonio: equipamento.patrimonio || 'Não se aplica',
          serie: equipamento.serie || '___', // se tiver esse campo na sua state (vc pode adicionar)
          title,
          backup: formatacaoForm === 'com' ? matriculasAdicionais.filter(m => m.trim() !== '').join(', ') : 'Dispensado',
          instalacao: 'Não se aplica', // ou algum campo seu se for usar hardware
        },
      });
    });
  };

  return (
    <>
      <div className="form-garantia">
        <h2>Formulário de Garantia</h2>
        <p>Preencha os dados para registrar a solicitação de envio do equipamento à garantia.</p>

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
                    readOnly={index === 0}
                  />
                  {index !== 0 && emails.length > 1 && (
                    <button type="button" onClick={() => handleRemoveEmail(index)}>-</button>
                  )}
                  {index === emails.length - 1 && (
                    <button type="button" onClick={handleAddEmail}>+</button>
                  )}
                </div>
              ))}

              <label>Equipamentos:</label>
              {equipamentos.map((equipamento, index) => (
                <div key={index} className="dynamic-group" style={{ flexWrap: 'wrap', gap: '8px' }}>
                  <select
                    value={equipamento.tipo}
                    onChange={(e) =>
                      handleEquipamentoChange(index, 'tipo', e.target.value)
                    }
                    style={{ flex: '1 1 150px' }}
                  >
                    <option value="">Tipo</option>
                    {equipamentoOptions.map((op) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Marca / Modelo"
                    value={equipamento.modelo}
                    onChange={(e) =>
                      handleEquipamentoChange(index, 'modelo', e.target.value)
                    }
                    style={{ flex: '1 1 200px' }}
                  />

                  <select
                    value={equipamento.defeito}
                    onChange={(e) =>
                      handleEquipamentoChange(index, 'defeito', e.target.value)
                    }
                    style={{ flex: '1 1 180px' }}
                  >
                    <option value="">Defeito Apresentado</option>
                    {defeitoOptions.map((op) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                      type="checkbox"
                      checked={equipamento.temPatrimonio}
                      onChange={(e) =>
                        handleEquipamentoChange(index, 'temPatrimonio', e.target.checked)
                      }
                    />
                    Tem patrimônio?
                  </label>

                  <input
                    type="text"
                    placeholder={
                      equipamento.temPatrimonio
                        ? 'Patrimônio nº'
                        : 'Patrimônio nº Não se Aplica'
                    }
                    disabled={!equipamento.temPatrimonio}
                    value={equipamento.patrimonio}
                    onChange={(e) =>
                      handleEquipamentoChange(index, 'patrimonio', e.target.value)
                    }
                    style={{ flex: '1 1 160px' }}
                  />

                  {equipamentos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEquipamento(index)}
                      style={{ height: '32px', width: '32px', borderRadius: '50%' }}
                    >
                      -
                    </button>
                  )}
                  {index === equipamentos.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddEquipamento}
                      style={{ height: '32px', width: '32px', borderRadius: '50%' }}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}

              <label style={{ marginTop: '1rem' }}>
                <input
                  type="checkbox"
                  checked={requerFormatacao}
                  onChange={(e) => {
                    setRequerFormatacao(e.target.checked);
                    if (!e.target.checked) {
                      setFormatacaoForm(null);
                      setMatriculasAdicionais(['']);
                    }
                  }}
                />
                Requer formatação?
              </label>

              {requerFormatacao && (
                <>
                  <label>Formatação:</label>
                  <div className="radio-options">
                    <label>
                      <input
                        type="radio"
                        name="formatacao"
                        value="com"
                        checked={formatacaoForm === 'com'}
                        onChange={(e) => setFormatacaoForm(e.target.value)}
                      />
                      Com backup
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="formatacao"
                        value="sem"
                        checked={formatacaoForm === 'sem'}
                        onChange={(e) => setFormatacaoForm(e.target.value)}
                      />
                      Sem backup
                    </label>
                  </div>

                  {formatacaoForm === 'com' && (
                    <>
                      <label>Matrículas adicionais para liberação de backup:</label>
                      {matriculasAdicionais.map((mat, index) => (
                        <div key={index} className="dynamic-group">
                          <input
                            type="text"
                            placeholder="Matrícula"
                            value={mat}
                            onChange={(e) => handleMatriculaAdicionalChange(e.target.value, index)}
                          />
                          {matriculasAdicionais.length > 1 && (
                            <button type="button" onClick={() => handleRemoveMatricula(index)}>-</button>
                          )}
                          {index === matriculasAdicionais.length - 1 && (
                            <button type="button" onClick={handleAddMatricula}>+</button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}

            </div>
          </div>

          <div className="form-right">
            <div className="form-garantia">
              <label>Título:</label>
              <input type="text" readOnly value={tituloFinal} />

              <label>Data:</label>
              <input type="text" value={dataAtual} readOnly />
            </div>

            <div className="form-garantia">
            <button
              disabled={!isFormularioValido()}
              className="submit-button"
              onClick={handleGerarTermoGarantia}
            >
              Gerar Termo de Garantia
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GarantiaForm;
