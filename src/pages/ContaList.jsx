import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ListLayout } from "../layout/ListLayout";
import { TableCell } from "../components/DataGrid";

export function ContaList()
{

    
    const renderObjeto = (objeto) => (
        <tr  key={objeto.id_conta}>
          <TableCell> {objeto.id_conta}</TableCell>  
          <TableCell> {objeto.nm_conta}</TableCell>  
        </tr>          
      );


    return (
       <ListLayout
            titulo="Lista de Contas"
            endpoint={"/conta/"}
            renderItem={renderObjeto} // Passa a função de renderização
        >

          
       </ListLayout>
    );
}