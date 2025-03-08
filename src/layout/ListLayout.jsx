import Container from "../components/Container";
import ContainerMain from "../components/ContainerMain";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchDados } from "../api/api";
import { DataGrid } from "../components/DataGrid";


export function ListLayout ({titulo,endpoint,renderItem, children}) 
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
         const obterContas = async () => {
             const dadosAPI = await fetchDados();
             setData(dadosAPI);
         };
 
         obterContas();
     }, []);

    return (
        <ContainerMain>
            <Container >

                <Header titulo={titulo}/>
                 
                <div   >
                  <DataGrid data={data} renderItem={renderItem} />
                </div>
              

                    {children}
              
                {/* <Outlet /> */}
            </Container>
        </ContainerMain>
    );
}