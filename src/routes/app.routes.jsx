import { Route, Routes } from "react-router";
import {  MenuLayout } from "../layout/MenuLayout";
import { ListLayout } from "../layout/ListLayout";
import { ContaList } from "../pages/ContaList";
import ContaForm from "../pages/ContaForm";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

export function AppRoutes () 
{
    return (
     
        <Routes>

        <Route path="/menu" element={<MenuLayout />}>
            <Route index element={<h2>Bem-vindo ao Menu!</h2>} /> {/* Rota padrão para /menu */}
    
        </Route>
        <Route path="/conta" element={<ListLayout titulo={"Contas"} endpoint={"/conta/"} />}>
            <Route index element={<ContaList />} /> {/* Rota padrão para /conta */}
            <Route path="/conta/form" element={<ContaForm />} />
        </Route>


    </Routes>

      
    );
}