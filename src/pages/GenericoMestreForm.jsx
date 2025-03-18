import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import AlertCustom from "../components/AlertCustom";
import { obterSequencia } from "../api/api";
import { useOutletContext } from "react-router";
import { erroEspecifico } from "../errorHandler";
import GenericoDetalheForm from "./GenericoDetalheForm";
import { FormGroupDinamico } from "../components/FormGroupDinamico";

const GenericoMestreForm = ({ nm_sequencia, fields, onEdit, onSave, onShow, fieldsItens }) => {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const [itens, setItens] = useState([]); // Estado para os itens
    const { endpoint } = useOutletContext();

    const carregarDados = async () => {
        const data = await onEdit();
        if (data)
        {
            setFormData(data);
            setItens(data.itenslancamento || []); // Carrega os itens se existirem
        }
        else
        {
            onShow();
            carregarSequencia(nm_sequencia);
            const initialData = {};
            fields.forEach(field => {
                initialData[field.name] = field.defaultValue || "";
            });
            setFormData(initialData);
        }
    };

    const carregarSequencia = async (nm_sequencia) => {
        if (!nm_sequencia) {
            return;
        }
        const sq_sequencia = await obterSequencia(endpoint);
        if (erroEspecifico(sq_sequencia)) {
            return;
        }
        setFormData((prevData) => ({
            ...prevData,
            [nm_sequencia]: sq_sequencia
        }));
    };

    useEffect(() => {
        carregarDados();
    }, [onEdit, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSave = { ...formData, "itenslancamento": itens }; // Inclui os itens no objeto a ser salvo
        await onSave(dataToSave);
    };

    const addItem = (item) => {
        setItens((prevItems) => [...prevItems, item]);
    };

    const removeItem = (index) => {
        setItens((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const updateItem = (index, updatedItem) => {
        setItens((prevItems) => {
            const newItems = [...prevItems];
            newItems[index] = updatedItem; // Atualiza o item no índice especificado
            return newItems;
        });
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>

            <FormGroupDinamico fields={fields} formData={formData} handleChange={handleChange} />

                {fieldsItens && (
                    <GenericoDetalheForm 
                        addItem={addItem} 
                        updateItem={updateItem} 
                        removeItem={removeItem} 
                        itens={itens} 
                        fields={fieldsItens} 
                    />
                )}
                
                <Button style={{ marginTop: '6px', marginBottom: '6px' }} type="submit">Salvar</Button>
            </Form>
            {message && <AlertCustom tipo={"info"} titulo={"Aviso"} msg={message} />}
        </div>
    );
};

export default GenericoMestreForm;