import { Form } from "react-bootstrap";
import { fetchDados, criarItem } from "../api/api"; // Certifique-se de que a função criarItem está definida
import { useQuery } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { erroEspecifico } from "../errorHandler";
import { useNavigate, useOutletContext } from "react-router";

function ContaForm() {

    const {  fetchDataList } = useOutletContext();
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate();

    //exibir tipo conta
    const [dataTipoConta, setDataTipoConta] = useState([]);
    
        useEffect(() => {
            const fetchData = async () => {
                const resposta = await fetchDados("/tipoconta/");

                if(!erroEspecifico(resposta))
                {
                    setDataTipoConta(resposta); 
                }
                else
                {
                    setMessage(erroEspecifico(resposta));
                }
            };
    
            fetchData(); 
        }, []); 
    
    
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
    
        if (formData)
        {
            const resposta = await criarItem('/conta/', formData);
            
            if (!erroEspecifico(resposta))
            {
                setMessage("Conta salva com sucesso!");
                fetchDataList()
                navigate('/conta/');
            }
            else
            {
                setMessage(erroEspecifico(resposta));
            }
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
                    required
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
                    required // Adiciona a propriedade required
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
                    required // Adiciona a propriedade required
                >
                    <option value="">Selecione uma opção</option>
                    {dataTipoConta && dataTipoConta.length > 0 ? (
                        dataTipoConta.map((tipo) => (
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