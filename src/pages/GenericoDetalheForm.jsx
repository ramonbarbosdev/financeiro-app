import React, { useState } from "react";
import { Form, Button, Table, Alert } from "react-bootstrap";
import { FormGroupDinamico } from "../components/FormGroupDinamico";

const GenericoDetalheForm = ({ addItem, updateItem, removeItem, itens, fields }) => {
    
    const [itemDetail, setItemDetail] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setItemDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value,
        }));
    };

    const validateFields = () => {
        return fields.every(field => {
            return field.required ? itemDetail[field.name] : true;
        });
    };

    const handleAddOrUpdateItem = () => {
        if (validateFields()) {
            if (isEditing) {
                updateItem(editIndex, itemDetail); // Atualiza o item existente
                setIsEditing(false);
                setEditIndex(null);
            } else {
                addItem(itemDetail); // Adiciona um novo item
            }
            setItemDetail({}); // Limpa o formulário de item
            setErrorMessage(""); // Limpa mensagens de erro
        } else {
            setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
        }
    };

    const handleEditItem = (index) => {
        setItemDetail(itens[index]); // Preenche o formulário com os dados do item
        setIsEditing(true);
        setEditIndex(index);
    };

    return (
        <div>
            <h3>{isEditing ? "Editar Detalhe" : "Adicionar Detalhe"}</h3>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          
            <FormGroupDinamico fields={fields} formData={itemDetail} handleChange={handleDetailChange} />

            
            <Button type="button" onClick={handleAddOrUpdateItem}>
                {isEditing ? "Atualizar Item" : "Adicionar Item"}
            </Button>

            <h3>Detalhes Adicionados</h3>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {fields.map((field) => (
                            <th key={field.name}>{field.label}</th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item, index) => (
                        <tr key={index}>
                            {fields.map((field) => (
                                <td key={field.name}>{item[field.name]}</td>
                            ))}
                            <td>
                                <Button variant="warning" onClick={() => handleEditItem(index)}>Editar</Button>
                                <Button variant="danger" onClick={() => removeItem(index)}>Remover</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default GenericoDetalheForm;