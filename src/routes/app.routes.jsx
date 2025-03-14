import { Route, Routes } from "react-router";
import {  MenuLayout } from "../layout/MenuLayout";
import { ListLayout } from "../layout/ListLayout";
import { ContaList } from "../pages/ContaList";
import ContaForm from "../pages/ContaForm";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { CategoriaList } from "../pages/CategoriaList";
import CategoriaForm from "../pages/CategoriaForm";
import { LancamentoForm } from "../pages/LancamentoForm";
import { LancamentoList } from "../pages/ContaList copy";

export function AppRoutes () 
{
    return (
     
        <Routes>

        <Route path="/menu" element={<MenuLayout />}>
            {/* <Route index element={<h2>Bem-vindo ao Menu!</h2>} />  */}
    
        </Route>
        <Route path="/conta" element={<ListLayout titulo={"Contas"} endpoint={"conta"} />}>
            <Route index element={<ContaList />} /> 
            <Route path="/conta/form" element={<ContaForm />} />
        </Route>
        <Route path="/categoria" element={<ListLayout titulo={"Categorias"} endpoint={"categoria"} />}>
            <Route index element={<CategoriaList />} /> 
            <Route path="/categoria/form" element={<CategoriaForm />} />
        </Route>

        <Route path="/lancamento" element={<ListLayout titulo={"Lancamentos"} endpoint={"lancamento"} />}>
            <Route index element={<LancamentoList />} /> 
            <Route path="/lancamento/form" element={<LancamentoForm />} />
        </Route>


    </Routes>

      
    );
}