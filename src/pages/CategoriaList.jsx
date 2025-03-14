import { useOutletContext } from "react-router";
import { DataGrid } from "../components/DataGrid";

export function CategoriaList()
{
    const { data } = useOutletContext();
    const key = "id_categoria";

    const columns = [
        { header: 'Id', key: key, hidden: true },
        { header: 'Tipo', key: 'id_tipocategoria' , relatedTable: 'tipocategoria' , column: 'nm_tipocategoria' },
        { header: 'Nome', key: 'nm_categoria' },
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