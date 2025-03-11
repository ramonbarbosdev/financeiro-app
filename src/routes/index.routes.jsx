import { memo } from "react";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./app.routes";

export function Router () 
{
    const user = null;
    
    return (
        <BrowserRouter>
            {/* {user ? <AppRoutes /> : <AuthRoutes />} */}
            <AppRoutes />
        </BrowserRouter>
    )
}