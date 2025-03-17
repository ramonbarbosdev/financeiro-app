import { useEffect, useState } from "react";
import { atualizarItem, criarItem, fetchDados } from "../api/api"; // Certifique-se de que as funções estão definidas
import GenericoForm from "./GenericoForm"; // Importa o componente de formulário genérico
import { erroEspecifico } from "../errorHandler";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import AlertCustom from "../components/AlertCustom";
import { useQuery } from "@tanstack/react-query";

export  function LancamentoForm()
{
    const [message, setMessage] = useState("");
    const { endpoint, obterListaDatagrid } = useOutletContext();
    const [searchParams] = useSearchParams();
    const primarykey = searchParams.get('id');
    const navigate = useNavigate();

    const obterDados = async (tabela) => {
        const resposta = await fetchDados(tabela);
        return resposta; 
    };
    
    const { data: dataConta = [] } = useQuery({
        queryKey: ['conta'],
        queryFn: () => obterDados('conta'),
      });

    const { data: dataStatus = [] } = useQuery({
        queryKey: ['statuslancamento'],
        queryFn: () => obterDados('statuslancamento'),
      });

    const fields = [
        { name: "cd_lancamento", label: "Codigo", type: "text", required: true },
        { name: "dt_lancamento", label: "Data", type: "date", required: true },
        { name: "ds_lancamento", label: "Descricao", type: "text", required: true },
        { name: "vl_lancamento", label: "Lancamento (R$)", type: "numeric", required: true },
        {
            name: "id_conta",
            label: "Conta",
            type: "select",
            required: true,
            options: dataConta.map((tipo) => ({
                value: tipo.id_conta,
                label: tipo.nm_conta,
            })),
        },
        {
            name: "id_statuslancamento",
            label: "Status",
            type: "select",
            required: true,
            options: dataStatus.map((status) => ({
                value: status.id_statuslancamento,
                label: status.ds_statuslancamento,
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
       
        let resposta = primarykey ? await atualizarItem(endpoint, formData) :  await criarItem(endpoint, formData);
        
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

    const onShow = async () => {

      
    };

   

    return (
        <div>
            <GenericoForm
                nm_sequencia={'cd_lancamento'}
                fields={fields}
                onEdit={onEdit}
                onShow={onShow} 
                onSave={onSave} 
            />
            {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}
        </div>
    );
}
