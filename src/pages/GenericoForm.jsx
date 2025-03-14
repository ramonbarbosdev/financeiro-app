import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import AlertCustom from "../components/AlertCustom";
import { obterSequencia } from "../api/api";
import { useOutletContext } from "react-router";

const GenericoForm = ({ nm_sequencia, fields,   onEdit, onSave, onShow }) =>
{
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const { endpoint } = useOutletContext();

    const carregarDados = async () => {
        
        const data = await onEdit();

        if (data)
        {
            setFormData(data); 
        }
        else
        {

            onShow();
            carregarSequencia(nm_sequencia);
            const initialData = {};
            fields.forEach(field => {
                initialData[field.name] = field.defaultValue || ""; 
            });
            setFormData(initialData);

        }
    };


    const carregarSequencia = async (nm_sequencia) =>
    {
        if(nm_sequencia)
        {
            const sq_sequencia = await obterSequencia(endpoint);
            setFormData((prevData) => ({
                ...prevData,
                [nm_sequencia]: sq_sequencia
            }));
        }
        
    };

    useEffect(() => {
        carregarDados();
    }, [onEdit, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onSave(formData); 
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <Form.Group key={field.name}>
                        <Form.Label>{field.label}</Form.Label>
                        {field.type === "select" ? (
                            <Form.Select
                                name={field.name}
                                value={formData[field.name] || ""} // Garante que o valor seja uma string vazia se não existir
                                onChange={handleChange}
                                required={field.required}
                                disabled={field.disabled}
                            >
                                <option value="">Selecione uma opção</option>
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        ) : (
                            <Form.Control
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                required={field.required}
                                disabled={field.disabled}
                            />
                        )}
                    </Form.Group>
                ))}
                <Button style={{ marginTop: '6px', marginBottom: '6px' }} type="submit">Salvar</Button>
            </Form>
            {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}
        </div>
    );
};

export default GenericoForm;