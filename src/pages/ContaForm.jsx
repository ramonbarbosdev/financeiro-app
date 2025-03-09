import { Form } from "react-bootstrap";
import { fetchDados, criarItem } from "../api/api"; // Certifique-se de que a função criarItem está definida
import { useQuery } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';
import { useState } from "react";

function ContaForm() {

    //TO:DO - COLOCAR VALIDACOES E PUXAR ERROS DA API PARA EXIBIR NO FRONT

    //carregar tipo da conta
    const { data: dadosTipoConta, error, isLoading } = useQuery({
        queryKey: ['tiposConta'],
        queryFn: () => fetchDados('/tipoconta/'),
    });

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
            console.log(formData)
        try
        {
            await criarItem('/conta/', formData); 
            setMessage("Conta salva com sucesso!"); 
        }
        catch (error)
        {
            console.error("Erro ao salvar a conta:", error);
            setMessage("Erro ao salvar a conta.");
        }
    };

    const [message, setMessage] = useState(""); 

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