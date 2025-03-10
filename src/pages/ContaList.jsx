import { useOutletContext } from "react-router";
import { DataGrid } from "../components/DataGrid";
import { useEffect, useState } from "react";

export function ContaList()
{

    const { data } = useOutletContext();

    
    const columns = [
      { header: 'Identificador', key: 'id_conta' },
      { header: 'Nome', key: 'nm_conta' },
      // { header: 'Saldo', accessor: item => item.saldo.toFixed(2) }, 
  ];

    return (
      <div>

        <DataGrid data={data} columns={columns}/>



      </div>
    );
}