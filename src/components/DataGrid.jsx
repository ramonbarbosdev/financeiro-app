import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router';
import { deletarItem, fetchDados } from '../api/api'; // Certifique-se de que a função fetchDados está definida
import { Pencil, Trash2 } from 'lucide-react';
import { erroEspecifico } from '../errorHandler';
import AlertCustom from './AlertCustom';
import { useNavigate } from "react-router";

export function DataGrid({ data = [], columns = [], primarykey }) {
    const { endpoint, obterListaDatagrid } = useOutletContext();
    const [message, setMessage] = useState("");
    const [dadosRelatado, setdadosRelatado] = useState({});
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const response = await deletarItem(endpoint, id);

        if (!erroEspecifico(response)) {
            obterListaDatagrid();
            setMessage("Registro deletado!"); 
        } else {
            setMessage(erroEspecifico(response));
        }
    };

    const handleEdit = (id) => {
        const query = new URLSearchParams();
        query.set("id", id);

        navigate(`/${endpoint}/form?${query}`); 
    };

    const buscarDadosRelacionados = async () => {
        const relatedTables = columns
            .filter(col => col.relatedTable)
            .map(col => col.relatedTable); 

        const fetchPromises = relatedTables.map(async (table) => {
            const resposta = await fetchDados(table); 
            return { table, data: resposta }; 
        });

        const results = await Promise.all(fetchPromises); 
       
        const mappedData = results.reduce((acc, { table, data }) => {
            acc[table] = data; 
            return acc;
        }, {});

        setdadosRelatado(mappedData);
    };

    useEffect(() => {
        buscarDadosRelacionados(); 
    }, [columns]); 

    const createMapping = (data, keyField, valueField) => {
        return data.reduce((acc, item) => {
            acc[item[keyField]] = item[valueField];
            return acc;
        }, {});
    };

    const dadosRelatadoMapa = Object.keys(dadosRelatado).reduce((acc, key) => {
        const column = columns.find(col => col.relatedTable === key);
        if (column) {
            acc[key] = createMapping(dadosRelatado[key], column.key, column.column);
        }
        return acc;
    }, {});

    return (
        <div>
            {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}

            <Table striped bordered hover className='table'>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            !col.hidden &&
                            (
                                <th key={index}>{col.header}</th>
                            )
                        ))}
                        <th>Ações</th> 
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    !col.hidden &&
                                    ( 
                                        <td key={colIndex}>
                                            {col.relatedTable && dadosRelatadoMapa[col.relatedTable] && dadosRelatadoMapa[col.relatedTable][item[col.key]] 
                                                ? dadosRelatadoMapa[col.relatedTable][item[col.key]] 
                                                : item[col.key]}
                                        </td>
                                    )
                                ))}
                                <td>
                                    <Button variant="primary" onClick={() => handleEdit(item[primarykey])}>
                                        <Pencil />
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(item[primarykey])}>
                                        <Trash2 />
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