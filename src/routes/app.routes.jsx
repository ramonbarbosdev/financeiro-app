import { Route, Routes } from "react-router";
import {  MenuLayout } from "../layout/MenuLayout";
import { ListLayout } from "../layout/ListLayout";
import { ContaList } from "../pages/ContaList";

export function AppRoutes () 
{
    return (
        <Routes>
            <Route element={<MenuLayout/>} path="/menu">
                    <Route index element={<MenuLayout />} />
            </Route>
            <Route element={<ContaList/>} path="/conta">
                    <Route index element={<ListLayout />} />
            </Route>
     
        </Routes>
    );
}