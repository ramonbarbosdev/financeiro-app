import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchDados, criarItem } from "../api/api"; // Certifique-se de que as funções estão definidas
import { erroEspecifico } from "../errorHandler";
import { useNavigate } from "react-router";
import AlertCustom from "../components/AlertCustom";

const GenericoForm = ({  fields, endpoint, obterListaDatagrid }) => {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const initialData = {};
        fields.forEach(field => {
            initialData[field.name] = field.defaultValue || ""; 
        });
        setFormData(initialData);
    }, [fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        
        event.preventDefault();

        try
        {
            const resposta = await criarItem(endpoint, formData);
            if (!erroEspecifico(resposta))
            {
                setMessage("Registro salvo com sucesso!");
                obterListaDatagrid(); 
                navigate(`/${endpoint}`); 
            }
            else
            {
                setMessage(erroEspecifico(resposta));
            }
        }
        catch (error)
        {
            setMessage("Erro ao salvar: " + error.message);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <Form.Group key={field.name}>
                        <Form.Label>{field.label}</Form.Label>
                        {
                            field.type === "select" ? 
                            (
                                <Form.Select
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required={field.required}
                                >
                                    <option value="">Selecione uma opção</option>
                                    {field.options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            )
                            :
                            (
                                field.disabled ? 
                                (
                                    <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required={field.required}
                                    disabled 
                                />
                                ) :
                                (
                                    <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required={field.required}
                                    
                                    />
                                )
                            
                            )
                        }
                    </Form.Group>
                ))}
                <Button style={{marginTop: '6px', marginBottom: '6px'}} type="submit">Salvar</Button>
            </Form>
            {message && <AlertCustom  tipo={"info"} titulo={"Aviso"} msg={message} />}
        </div>
    );
};

export default GenericoForm;