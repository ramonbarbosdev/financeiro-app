import { Form } from "react-bootstrap";
import { fetchDados, criarItem } from "../api/api"; // Certifique-se de que a função criarItem está definida
import { useQuery } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';
import { useState } from "react";
import { erroEspecifico } from "../errorHandler";

function ContaForm() {

    //exibir tipo conta
    const [message, setMessage] = useState(""); 

    const { data: dadosTipoConta, error, isLoading } = useQuery({
        queryKey: ['tiposConta'],
        queryFn: () => fetchDados('/tipoconta/'),
    });

    // console.log(error);
    // if(error)
    // {
    // }
    
    //salvar dados
    const [formData, setFormData] = useState({
        cd_conta: "",
        nm_conta: "",
        id_tipoconta: null,
        fl_ativo: null, 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, 
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const resposta = await criarItem('/conta/', formData); 

        if(!erroEspecifico(resposta))
        {
            setMessage("Conta salva com sucesso!"); 
        }
        else
        {
            setMessage(erroEspecifico(resposta));
        }
    };

 

    return (
        <div>
           <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Código</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="cd_conta" 
                        placeholder="" 
                        value={formData.cd_conta} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nome da Conta</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="nm_conta" 
                        placeholder="" 
                        value={formData.nm_conta} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="tipoContaSelect">Tipo de conta</Form.Label>
                    <Form.Select 
                        id="tipoContaSelect" 
                        name="id_tipoconta" 
                        value={formData.id_tipoconta} 
                        onChange={handleChange}
                    >
                        <option>Selecione</option>
                        {dadosTipoConta && dadosTipoConta.length > 0 ? (
                            dadosTipoConta.map((tipo) => (
                                <option key={tipo.id_tipoconta} value={tipo.id_tipoconta}>
                                    {tipo.nm_tipoconta}
                                </option>
                            ))
                        ) : (
                            <option>Nenhum tipo de conta disponível</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <fieldset disabled>
                    <Form.Group>
                        <Form.Label htmlFor="disabledTextInput">Ativo</Form.Label>
                        <Form.Control 
                            id="disabledTextInput" 
                            type="text" 
                            value={formData.fl_ativo === null ? "Não" : "Sim"} 
                            readOnly 
                        />
                    </Form.Group>
                </fieldset>

                <Button type="submit">Salvar</Button>
            </Form>
            {message && <div>{message}</div>} {/* Exibe a mensagem de sucesso ou erro */}
        </div>
    );
}

export default ContaForm;