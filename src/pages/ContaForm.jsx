import { useEffect, useState } from "react";
import { atualizarItem, criarItem, fetchDados } from "../api/api"; // Certifique-se de que a função fetchDados está definida
import GenericoForm from "./GenericoForm"; // Importa o componente de formulário genérico
import { erroEspecifico } from "../errorHandler";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import AlertCustom from "../components/AlertCustom";

function ContaForm() {
    const [dataTipoConta, setDataTipoConta] = useState([]);
    const [message, setMessage] = useState("");
    const { endpoint, obterListaDatagrid } = useOutletContext();
    const [searchParams] = useSearchParams();
    const primarykey = searchParams.get('id');
    const navigate = useNavigate();

    const obterTipoConta = async () => {
        const resposta = await fetchDados("tipoconta");
        if (!erroEspecifico(resposta)) {
            setDataTipoConta(resposta);
        } else {
            setMessage(erroEspecifico(resposta));
        }
    };

    useEffect(() => {
        obterTipoConta();
    }, []);

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
        // {
        //     name: "fl_ativo",
        //     label: "Ativo",
        //     type: "select",
        //     required: true,
        //     disabled: false,
        //     defaultValue: 1,
        //     options: [
        //         { value: 1, label: "Ativo" },
        //         { value: 0, label: "Inativo" },
        //     ],
        // },
    ];


    const onEdit = async () => {
        if (primarykey)
        {
            const resposta = await fetchDados(endpoint,primarykey);
            if (!erroEspecifico(resposta))
            {
                return resposta; 
            }
            else
            {
                setMessage(erroEspecifico(resposta));
            }
        }
    };

    const onSave = async (formData) => {

        if (primarykey)
        {
           
            const resposta = await atualizarItem(endpoint, formData);

            if (!erroEspecifico(resposta))
            {
                setMessage("Registro atualizado com sucesso!");
            }
            else
            {
                setMessage(erroEspecifico(resposta));
            }
        }
        else
        {
            const resposta = await criarItem(endpoint, formData);

            if (!erroEspecifico(resposta))
            {
                setMessage("Registro salvo com sucesso!");
            }
            else
            {
                setMessage(erroEspecifico(resposta));
            }


        }

        obterListaDatagrid(); 
        navigate(-1);
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