import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router';
import { deletarItem } from '../api/api'; // Certifique-se de que a função deletarItem está definida
import { Pencil, Trash, Trash2 } from 'lucide-react';
import { erroEspecifico } from '../errorHandler';
import AlertCustom from './AlertCustom';
import { useNavigate  } from "react-router";


export function DataGrid({ data = [], columns = [], primarykey }) {
    const { endpoint, obterListaDatagrid } = useOutletContext();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleDelete = async (id) => {
      const response = await deletarItem(endpoint, id);

      if (!erroEspecifico(response))
      {
          obterListaDatagrid();
          setMessage("Registro deletado!"); 
      }
      else
      {
          setMessage(erroEspecifico(response));
      }
      
    };

    const handleEdit = (id) => {
        const query = new URLSearchParams();
        query.set("id", id);

        navigate(`/${endpoint}/form?${query}`); 
    };


    return (
        <div>
        {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}

        <Table striped bordered hover className='table'>
              <thead>
                  <tr>
                      {columns.map((col, index) => (
                          <th key={index}>{col.header}</th>
                      ))}
                      <th> </th> 
                  </tr>
              </thead>
              <tbody>
                  {data.length > 0 ? (
                      data.map((item, rowIndex) => (
                          <tr key={rowIndex}>
                              {columns.map((col, colIndex) => (
                                  <td key={colIndex}>
                                      {col.accessor ? col.accessor(item) : item[col.key]}
                                  </td>
                              ))}
                               <td>
                                  <Button variant="primary" onClick={() => handleEdit(item[primarykey])}>
                                      <Pencil />
                                  </Button>
                              </td>
                              <td>
                                  <Button variant="danger" onClick={() => handleDelete(item[primarykey])}>
                                    <Trash2/>
                                  </Button> 
                              </td>
                             
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan={columns.length + 1}>Nenhum dado disponível</td>
                      </tr>
                  )}
              </tbody>
          </Table>
        </div>
       
    );
}