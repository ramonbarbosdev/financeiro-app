import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

function Header({ titulo}) 
{
    const navigate = useNavigate();
    const location = useLocation();

    function redirection(router)
    {
        const query = new URLSearchParams();
        // query.set("descricao", tasks.descricao);
        navigate(`/${router}?${query}`)
    }

    const isMenuRoute = location.pathname === "/menu";

    return(
        <div className="container-header "> 

            <div className="container-botao-header">
                {!isMenuRoute && (
                    <button onClick={() => redirection("menu")} className="botao-header">
                        <ArrowLeft />
                    </button>
                )}
            </div>

            <div className='container-header-titulo'>
                    <h4 className=''>{titulo}</h4>
            </div>
        </div>
    );
}

export default Header;