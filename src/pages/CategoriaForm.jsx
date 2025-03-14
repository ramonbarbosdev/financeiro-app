import { useEffect, useState } from "react";
import { atualizarItem, criarItem, fetchDados } from "../api/api"; // Certifique-se de que as funções estão definidas
import GenericoForm from "./GenericoForm"; // Importa o componente de formulário genérico
import { erroEspecifico } from "../errorHandler";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import AlertCustom from "../components/AlertCustom";
import { useQuery } from "@tanstack/react-query";

function CategoriaForm() {
    const [message, setMessage] = useState("");
    const { endpoint, obterListaDatagrid } = useOutletContext();
    const [searchParams] = useSearchParams();
    const primarykey = searchParams.get('id');
    const navigate = useNavigate();

    const obterDados = async (tabela) => {
        const resposta = await fetchDados(tabela);
        return resposta; 
    };
    
    const { data: dataTipoCategoria = [] } = useQuery({
        queryKey: ['tipocategoria'],
        queryFn: () => obterDados('tipocategoria'),
      });

    const fields = [
        { name: "cd_categoria", label: "Codigo", type: "text", required: true },
        { name: "nm_categoria", label: "Nome da Categoria", type: "text", required: true },
        {
            name: "id_tipocategoria",
            label: "Tipo de Categoria",
            type: "select",
            required: true,
            options: dataTipoCategoria.map((tipo) => ({
                value: tipo.id_tipocategoria,
                label: tipo.nm_tipocategoria,
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
                nm_sequencia={'cd_categoria'}
                fields={fields}
                onEdit={onEdit}
                onShow={onShow} 
                onSave={onSave} 
            />
            {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}
        </div>
    );
}

export default CategoriaForm;