import { Outlet, useNavigate, useSearchParams } from "react-router";
import Container from "../components/Container";
import { ArrowLeft } from "lucide-react";
import ContainerMain from "../components/ContainerMain";
import ButtonCustom from "../components/ButtonCustom";
import Header from "../components/Header";
import Input from "../components/Input";
import { useState } from "react";

export function FormLayout () 
{
    const [serachParams] = useSearchParams();
    const titulo = serachParams.get('titulo')

    const [nmConta, setNmConta] = useState();
    const [tpConta, setTpConta] = useState();


    function onSave(nmConta, tpConta)
    {
        console.log(nmConta, tpConta);
    }

    return (
        <ContainerMain>
            <Container>

              <Header titulo={titulo}/>

                <div className="gap-2 flex justify-center items-center flex-col text-gray-600 w-full">
                    
                    <Input
                     placeholder="Nome da Conta"
                     type="text"
                     onChange={(event) => setNmConta(event.target.value)}
                     />
                    
                    <select 
                        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
                        onChange={(event) => setTpConta(event.target.value)}
                        value={tpConta}
                        >
                        <option value="" disabled selected></option>
                        <option value="1"  >Bancaria</option>
                        <option value="2"  >Caixa</option>
                        <option value="3"  >Investimento</option>

                    </select>

                  

                </div>

                <button 
                    onClick={() => {onSave(nmConta, tpConta)} } 
                    className="bg-slate-400 text-white  p-2 rounded-md">
                        Adicionar
                </button>
               

              
                {/* <Outlet /> */}
            </Container>
        </ContainerMain>
    );
}