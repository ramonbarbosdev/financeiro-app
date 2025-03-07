import { memo } from "react";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./app.routes";

export function Router () 
{
    const user = null;
    console.log(user)
    return (
        <BrowserRouter>
            {/* {user ? <AppRoutes /> : <AuthRoutes />} */}
            <AppRoutes />
        </BrowserRouter>
    )
}