import { useOutletContext } from "react-router";
import { DataGrid } from "../components/DataGrid";

export function LancamentoList() {
    const { data } = useOutletContext();
    const key = "id_conta";

    const columns = [
        { header: 'Id', key: key, hidden: true},
        { header: 'Código', key: 'cd_lancamento' },
        { header: 'Conta', key: 'id_conta', relatedTable: 'conta', column: 'nm_conta' },
        { header: 'Status', key: 'id_statuslancamento', relatedTable: 'statuslancamento', column: 'nm_statuslancamento' }
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