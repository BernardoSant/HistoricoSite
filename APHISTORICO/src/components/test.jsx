import  { useState } from 'react';

function TelaDeGasto() {
  const [rows, setRows] = useState([]);

  const addRow = (numRows = 1) => {
    const newRows = Array(numRows).fill({
      nome: '',
      produto: '',
      preco: '',
      unidade: '',
      medida: ''
    });
    setRows([...rows, ...newRows]);
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleChange = (event, index, field) => {
    const newRows = [...rows];
    newRows[index][field] = event.target.value;
    setRows(newRows);
  };

  return (
    <div>
      <h2>Tela de Gasto</h2>
      <input type="number" onChange={(e) => addRow(Number(e.target.value))} placeholder="Adicionar linhas" />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>Unidade</th>
            <th>Medida</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.nome} onChange={(e) => handleChange(e, index, 'nome')} /></td>
              <td><input type="text" value={row.produto} onChange={(e) => handleChange(e, index, 'produto')} /></td>
              <td><input type="text" value={row.preco} onChange={(e) => handleChange(e, index, 'preco')} /></td>
              <td><input type="text" value={row.unidade} onChange={(e) => handleChange(e, index, 'unidade')} /></td>
              <td><input type="text" value={row.medida} onChange={(e) => handleChange(e, index, 'medida')} /></td>
              <td><button onClick={() => deleteRow(index)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TelaDeGasto;

