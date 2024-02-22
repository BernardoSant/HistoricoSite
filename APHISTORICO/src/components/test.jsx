import  { useState } from 'react';

function TelaDeGasto() {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    const newRow = {
      nome: '',
      produto: '',
      preco: '',
      unidade: '',
      medida: ''
    };
    setRows([...rows, newRow]);
  };

  const handleChange = (event, index, field) => {
    const newRows = [...rows];
    newRows[index][field] = event.target.value;
    setRows(newRows);
  };

  return (
    <div>
      <h2>Tela de Gasto</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>Unidade</th>
            <th>Medida</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Adicionar</button>
    </div>
  );
}

export default TelaDeGasto;
