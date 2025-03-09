import { useSearchParams } from "react-router";
import Container from "../components/Container";
import ContainerMain from "../components/ContainerMain";

function ContaForm({})
{
    const [serachParams] = useSearchParams();

    const titulo = serachParams.get('titulo')

    return(
        <h1 style={"color: black"}>Cadastro</h1>
        
       
    );
}

export default ContaForm;