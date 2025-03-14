import Container from "../components/Container";
import ContainerMain from "../components/ContainerMain";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchDados } from "../api/api";
import { Outlet } from "react-router";
import { erroEspecifico } from "../errorHandler";
import AlertCustom from "../components/AlertCustom";

export function ListLayout({ titulo, endpoint })
{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const obterListaDatagrid = async () => {
        const response = await fetchDados(endpoint);

        if (!erroEspecifico(response))
        {
            setData(response);
        }
        else
        {
            setError(erroEspecifico(response));
        }
      
    };

    
    useEffect(() => {
        obterListaDatagrid();
    }, [endpoint]);

    const propsToPass = { data, endpoint, obterListaDatagrid };

    return (
        <ContainerMain>
            <Container>
                <Header titulo={titulo} endpoint={endpoint} fl_error={error}/>
                {error && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={error} />}
                {!error && data.length > 0 && <Outlet context={propsToPass} />}
            </Container>
        </ContainerMain>
    );
   
}