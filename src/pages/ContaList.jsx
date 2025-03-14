import { useOutletContext } from "react-router";
import { DataGrid } from "../components/DataGrid";

export function ContaList() {
    const { data } = useOutletContext();
    const key = "id_conta";

    const columns = [
        { header: 'Id', key: key, hidden: true},
        { header: 'Código', key: 'cd_conta' },
        { header: 'Nome', key: 'nm_conta' },
        { header: 'Tipo', key: 'id_tipoconta', relatedTable: 'tipoconta', column: 'nm_tipoconta' },
        { header: 'Status', key: 'id_statusconta', relatedTable: 'statusconta', column: 'nm_statusconta' }
    ];

   
    return (
        <div>
            <DataGrid 
                data={data} 
                columns={columns}
                primarykey={key}
               
            />
        </div>
    );
}