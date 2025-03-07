import { Outlet, useNavigate, useSearchParams } from "react-router";
import Container from "../components/Container";
import { ArrowLeft } from "lucide-react";
import ContainerMain from "../components/ContainerMain";
import ButtonCustom from "../components/ButtonCustom";

export function AcaoLayout () 
{
    const navigate = useNavigate();
    const [serachParams] = useSearchParams();

    const titulo = serachParams.get('titulo')


    function redirection(router)
    {
        const query = new URLSearchParams();
        // query.set("descricao", tasks.descricao);
        navigate(`/${router}?${query}`)
    }

    return (
        <ContainerMain>
            <Container>

                <div className="flex bg-fundo-titulo gap-3"> 
                    <div>
                        <button  onClick={() => redirection("menu")} className="bg-transparent text-white p-2 rounded-md">
                                <ArrowLeft/>
                        </button>
                    </div>

                    <div className=' w-100 space-x-4 flex justify-center items-center  text-black'>
                            <h4 className=''>{titulo}</h4>
                    </div>
                </div>

               

              
                {/* <Outlet /> */}
            </Container>
        </ContainerMain>
    );
}