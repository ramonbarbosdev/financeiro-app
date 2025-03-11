import { useEffect, useState } from "react";
import { atualizarItem, criarItem, fetchDados } from "../api/api"; // Certifique-se de que as funções estão definidas
import GenericoForm from "./GenericoForm"; // Importa o componente de formulário genérico
import { erroEspecifico } from "../errorHandler";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import AlertCustom from "../components/AlertCustom";
import { useQuery } from "@tanstack/react-query";

function ContaForm() {
    const [message, setMessage] = useState("");
    const { endpoint, obterListaDatagrid } = useOutletContext();
    const [searchParams] = useSearchParams();
    const primarykey = searchParams.get('id');
    const navigate = useNavigate();

    const obterDados = async (tabela) => {
        const resposta = await fetchDados(tabela);
        return resposta; 
    };
 
    const { data: dataTipoConta = [] } = useQuery({
        queryKey: ['tipoconta'],
        queryFn: () => obterDados('tipoconta'),
      });

    const { data: dataStatusConta = [] } = useQuery({
        queryKey: ['stausconta'],
        queryFn: () => obterDados('statusconta'),
      });

    const fields = [
        { name: "cd_conta", label: "Código", type: "text", required: true },
        { name: "nm_conta", label: "Nome da Conta", type: "text", required: true },
        {
            name: "id_tipoconta",
            label: "Tipo de Conta",
            type: "select",
            required: true,
            options: dataTipoConta.map((tipo) => ({
                value: tipo.id_tipoconta,
                label: tipo.nm_tipoconta,
            })),
        },
        {
            name: "id_statusconta",
            label: "Status",
            type: "select",
            required: true,
            options: dataStatusConta.map((status) => ({
                value: status.id_statusconta,
                label: status.nm_statusconta,
            })),
        },
       
    ];

    const onEdit = async () => {
        if (primarykey)
        {
            const resposta = await fetchDados(endpoint, primarykey);

            if (!erroEspecifico(resposta))
            {
                return resposta; 
            }
            
            setMessage(erroEspecifico(resposta));
        }
    };

    const onSave = async (formData) => {
       
        let resposta = primarykey ? await atualizarItem(endpoint, formData) :  resposta = await criarItem(endpoint, formData);

        if (!erroEspecifico(resposta))
        {
            setMessage("Registro atualizado com sucesso!");
            obterListaDatagrid(); 
            navigate(-1); 
        }
        else
        {
            setMessage(erroEspecifico(resposta));
        }
     
    };

   

    return (
        <div>
            <GenericoForm
                primarykey={primarykey}
                fields={fields}
                endpoint={endpoint}
                obterListaDatagrid={obterListaDatagrid}
                onEdit={onEdit} 
                onSave={onSave} 
            />
            {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}
        </div>
    );
}

export default ContaForm;