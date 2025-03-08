import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ListLayout } from "../layout/ListLayout";
import { TableCell } from "../components/DataGrid";

export function ContaList()
{

    
    const renderConta = (conta) => (
        <tr  key={conta.id_conta}>
          <TableCell> {conta.cd_conta}</TableCell>  
          <TableCell> {conta.nm_conta}</TableCell>  
        </tr>

          
      );


    return (
       <ListLayout
            titulo="Lista de Contas"
            endpoint={"/conta"}
            renderItem={renderConta} // Passa a função de renderização
        >

          
       </ListLayout>
    );
}