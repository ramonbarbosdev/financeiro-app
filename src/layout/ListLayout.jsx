import Container from "../components/Container";
import ContainerMain from "../components/ContainerMain";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchDados } from "../api/api";
import { DataGrid } from "../components/DataGrid";
import { Outlet } from "react-router";


export function ListLayout ({titulo, endpoint}) 
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
         const obterContas = async () => {
             const dadosAPI = await fetchDados(endpoint);
             setData(dadosAPI);
         };
 
         obterContas();
     }, []);


    const propsToPass = {  data};

    return (
        <ContainerMain>
            <Container >

                <Header titulo={titulo} pathform={`${endpoint}form` }/>
                  
               
                <Outlet context={propsToPass} />
            </Container>
        </ContainerMain>
    );
}