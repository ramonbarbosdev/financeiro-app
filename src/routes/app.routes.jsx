import { Route, Routes } from "react-router";
import {  MenuLayout } from "../layout/MenuLayout";
import ContaPage from "../pages/ContaPage";
import { AcaoLayout } from "../layout/AcaoLayout";

export function AppRoutes () 
{
    return (
        <Routes>
            <Route element={<MenuLayout/>} path="/menu">
                    <Route index element={<MenuLayout />} />
            </Route>
            <Route element={<AcaoLayout/>} path="/conta">
                    <Route index element={<AcaoLayout />} />
            </Route>
     
        </Routes>
    );
}