// src/components/DataGrid.js
import React from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';



export function DataGrid({ data = [], columns = [] }) {

  return (
    <Table striped bordered hover className='table'>
      <thead>
        <tr>
        {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
        </tr>
      </thead>
      <tbody>
      {data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>
                                {col.accessor ? col.accessor(item) : item[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
      </tbody>
    </Table>
  );
}