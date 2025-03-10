import Container from "../components/Container";
import ContainerMain from "../components/ContainerMain";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchDados } from "../api/api";
import { DataGrid } from "../components/DataGrid";
import { Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { erroEspecifico } from "../errorHandler";


export function ListLayout ({titulo, endpoint}) 
{
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchDados(endpoint);
            setData(response); 
        };

        fetchData(); 
    }, []); 

    //TO:DO - QUANDO DER ERRO, NÃO PERMITIR ACESSAR NADA
    erroEspecifico(data)
      

    const propsToPass = {  data, endpoint};

    return (
        <ContainerMain>
            <Container >

                <Header titulo={titulo} pathform={`${endpoint}form` }/>
                  
                { erroEspecifico(data) == false ?    <Outlet context={propsToPass} />  : <div>{ erroEspecifico(data)}</div> }
        
            </Container>
        </ContainerMain>
    );
}