import { Outlet, useNavigate } from "react-router";
import Container from "../components/Container";
import { ArrowLeft } from "lucide-react";
import ContainerMain from "../components/ContainerMain";
import ButtonCustom from "../components/ButtonCustom";

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

                <div className=' space-x-4 flex justify-center'>
                        <h4 className='text-black'>Menu</h4>
                </div>

                <div className='flex flex-col space-x-4'>
                    <ButtonCustom onClick={()=> {redirection("conta", "Conta")}}> Conta </ButtonCustom>
                </div>
               
                {/* <Outlet /> */}
            </Container>
        </ContainerMain>
    );
}