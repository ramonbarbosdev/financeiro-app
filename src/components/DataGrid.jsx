// src/components/DataGrid.js
import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: black;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;

`;

export { TableCell };

export function DataGrid({ data, renderItem }) {
  return (

    
    <Table >
      <thead>
        <tr >
          <TableHeader>Codigo</TableHeader>
          <TableHeader>Nome</TableHeader>
          {/* Adicione mais cabeçalhos conforme necessário */}
        </tr>
      </thead>
      <tbody>
        {data.map(renderItem)} {/* Renderiza os itens usando a função renderItem */}
      </tbody>
    </Table>
  );
}