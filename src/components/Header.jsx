import { ArrowLeft, EclipseIcon, EllipsisVertical, Plus  } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import '../css/header.css'
import Dropdown from 'react-bootstrap/Dropdown';



function Header({ titulo, pathform}) 
{
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false); 

    function redirection(path)
    {
        const query = new URLSearchParams();
        // query.set("descricao", tasks.descricao);
        // navigate(`/${path}?${query}`)
        navigate(path);
    }

    const isMenuRoute = location.pathname === "/menu";

 
    return(
        <div className="container-header "> 

            <div className="container-botao-header">
                {!isMenuRoute && (
                    <button onClick={() => navigate(-1)} className="botao-header">
                        <ArrowLeft />
                    </button>
                )}
            </div>

            <div className='container-header-titulo'>
                    <h4 className=''>{titulo}</h4>
            </div>

            {!isMenuRoute && (
                      <Dropdown className="dropdown-botao">
                      <Dropdown.Toggle className="custom-toggle" id="dropdown-basic">
                          <EllipsisVertical />
                      </Dropdown.Toggle>
      
                      <Dropdown.Menu className="custom-menu">
                        <Dropdown.Item onClick={() => redirection(`${pathform}`)}>
                                <Plus /> Cadastrar
                            </Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                )}
          
        </div>

    );
}

export default Header;