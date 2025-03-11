import { useOutletContext } from "react-router";
import { DataGrid } from "../components/DataGrid";
import { useEffect, useState } from "react";

export function ContaList()
{

    const { data, endpoint } = useOutletContext();
    const key = "id_conta"
    
    const columns = [
      { header: 'Id', key: key },
      { header: 'Codigo', key: 'cd_conta' },
      { header: 'Nome', key: 'nm_conta' },
      // { header: 'Saldo', accessor: item => item.saldo.toFixed(2) }, 
  ];

    return (
      <div>

        <DataGrid data={data} columns={columns} primarykey={key}/>



      </div>
    );
}