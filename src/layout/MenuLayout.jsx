import { useNavigate } from "react-router";
import ButtonCustom from "../components/ButtonCustom";
import ContainerMain from "../components/ContainerMain";
import Container from "../components/Container";
import Header from "../components/Header";

import '../css/menulayout.css'

export function MenuLayout () 
{
    const navigate = useNavigate();

    function redirection(path)
    {
        // const query = new URLSearchParams();
        // query.set("titulo", titulo);
        // console.log()
        navigate(`${path}`)
    }

    return (
        <ContainerMain>
         
        <Container>
        
            <Header titulo="Menu"></Header>

                <div className='container-botao-menu'>
                    <ButtonCustom onClick={()=> {redirection("/conta")}}> Conta </ButtonCustom>
                    <ButtonCustom onClick={()=> {redirection("/categoria")}}> Categoria </ButtonCustom>
                    <ButtonCustom onClick={()=> {redirection("/lancamento")}}> Lancamento </ButtonCustom>
                </div>
 
            </Container>
        </ContainerMain>
     
        
    );
}