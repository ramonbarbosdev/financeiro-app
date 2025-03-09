import Container from "../components/Container";
import ContainerMain from "../components/ContainerMain";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchDados } from "../api/api";
import { DataGrid } from "../components/DataGrid";
import { Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";


export function ListLayout ({titulo, endpoint}) 
{

    
    const { data: data, error, isLoading } = useQuery({
        queryKey: ['conta'],
        queryFn: () => fetchDados('/conta/'),
      });


    const propsToPass = {  data, endpoint};

    return (
        <ContainerMain>
            <Container >

                <Header titulo={titulo} pathform={`${endpoint}form` }/>
                  
               
                <Outlet context={propsToPass} />
            </Container>
        </ContainerMain>
    );
}