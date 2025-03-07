import { useSearchParams } from "react-router";
import Container from "../components/Container";
import ContainerMain from "../components/ContainerMain";

function ContaPage({})
{
    const [serachParams] = useSearchParams();

    const titulo = serachParams.get('titulo')

    return(

         <ContainerMain>
            <Container  width='w-1/2'>
                <h1>{titulo}</h1>
            </Container>
         </ContainerMain>
       
    );
}

export default ContaPage;