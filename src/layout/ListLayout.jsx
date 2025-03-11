import Container from "../components/Container";
import ContainerMain from "../components/ContainerMain";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchDados } from "../api/api";
import { Outlet } from "react-router";
import { erroEspecifico } from "../errorHandler";

export function ListLayout({ titulo, endpoint })
{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    
    const obterListaDatagrid = async () => {
        try {
            const response = await fetchDados(endpoint);
            setData(response);
            setError(null);
        } catch (err) {
            setError(err.message); 
        }
    };

    
    useEffect(() => {
        obterListaDatagrid();
    }, [endpoint]);


    if (error) {
        return (
            <ContainerMain>
                <Container>
                    <Header titulo={titulo} pathform={`${endpoint}form`} />
                    <div>Erro: {error}</div> 
                </Container>
            </ContainerMain>
        );
    }

    const propsToPass = { data, endpoint, obterListaDatagrid };

    return (
        <ContainerMain>
            <Container>
                <Header titulo={titulo} pathform={`${endpoint}form`} />
                <Outlet context={propsToPass} />
            </Container>
        </ContainerMain>
    );
}