import { useEffect, useState } from "react";
import { fetchDados } from "../api/api"; // Certifique-se de que a função fetchDados está definida
import GenericoForm from "./GenericoForm"; // Importa o componente de formulário genérico
import { erroEspecifico } from "../errorHandler";
import { useNavigate, useOutletContext } from "react-router";
import AlertCustom from "../components/AlertCustom";

function ContaForm() {
    const [dataTipoConta, setDataTipoConta] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const {endpoint, obterListaDatagrid} =  useOutletContext();

    const obterTipoConta = async () => {
        const resposta = await fetchDados("/tipoconta/");
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
        { name: "fl_ativo", label: "Ativo", type: "text", required: true, defaultValue: true , disabled: true  },

    ];


    return (
        <div>
            <GenericoForm
                fields={fields}
                endpoint={endpoint}
                obterListaDatagrid={obterListaDatagrid}
            />
            {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}
        </div>
    );
}

export default ContaForm;