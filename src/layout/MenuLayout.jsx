import { useNavigate } from "react-router";
import ButtonCustom from "../components/ButtonCustom";
import ContainerMain from "../components/ContainerMain";
import Container from "../components/Container";
import Header from "../components/Header";

import '../css/menulayout.css'

export function MenuLayout () 
{
    const navigate = useNavigate();

    function redirection(router, titulo)
    {
        const query = new URLSearchParams();
        query.set("titulo", titulo);

        navigate(`/${router}?${query}`)
    }

    return (
        <ContainerMain>
         
        <Container>
        
            <Header titulo="Menu"></Header>

    

                <div className='container-botao-menu'>
                <ButtonCustom onClick={()=> {redirection("conta", "Conta")}}> Conta </ButtonCustom>
                <ButtonCustom onClick={()=> {redirection("conta", "Conta")}}> Conta </ButtonCustom>
                </div>
 
            </Container>
        </ContainerMain>
     
        
    );
}