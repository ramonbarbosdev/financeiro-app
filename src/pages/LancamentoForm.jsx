import { useEffect, useState } from "react";
import { atualizarItem, criarItem, fetchDados } from "../api/api"; // Certifique-se de que as funções estão definidas
import GenericoForm from "./GenericoForm"; // Importa o componente de formulário genérico
import { erroEspecifico } from "../errorHandler";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import AlertCustom from "../components/AlertCustom";
import { useQuery } from "@tanstack/react-query";
import GenericoMestreDetalheForm from "./GenericoMestreForm";
import GenericoMestreForm from "./GenericoMestreForm";

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

        
    const { data: dataTipoOperacao = [] } = useQuery({
        queryKey: ['tipooperacao'],
        queryFn: () => obterDados('tipooperacao'),
      });
        
    const { data: dataCategoria = [] } = useQuery({
        queryKey: ['categoria'],
        queryFn: () => obterDados('categoria'),
      });
    const { data: dataMetodoPagamento = [] } = useQuery({
        queryKey: ['metodopagamento'],
        queryFn: () => obterDados('metodopagamento'),
      });

    const fieldsItens = [
        { name: "id_lancamento", label: "Vinc Lancamento", type: "text",  disabled: true },
        {
            name: "id_tipooperacao",
            label: "Tipo Operacao",
            type: "select",
            options: dataTipoOperacao.map((tipo) => ({
                value: tipo.id_tipooperacao,
                label: tipo.ds_tipooperacao,
            })),
        },
        {
            name: "id_categoria",
            label: "Categoria",
            type: "select",
            options: dataCategoria.map((cate) => ({
                value: cate.id_categoria,
                label: cate.nm_categoria,
            })),
        },
        { name: "vl_movimento", label: "Valor", type: "numeric" },
        {
            name: "id_metodopagamento",
            label: "Metodo de Pagamento",
            type: "select",
            options: dataMetodoPagamento.map((metodo) => ({
                value: metodo.id_metodopagamento,
                label: metodo.ds_metodopagamento,
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
            <GenericoMestreForm
                nm_sequencia={'cd_lancamento'}
                fields={fields}
                onEdit={onEdit}
                onShow={onShow} 
                onSave={onSave}
                fieldsItens={fieldsItens}
            />
            {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}
        </div>
    );
}
