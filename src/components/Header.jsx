import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function Header({ titulo}) 
{
    const navigate = useNavigate();


    function redirection(router)
    {
        const query = new URLSearchParams();
        // query.set("descricao", tasks.descricao);
        navigate(`/${router}?${query}`)
    }

    return(
        <div className="flex gap-3  w-full   "> 
            <div>
                <button  onClick={() => redirection("menu")} className="bg-blue-500 text-white p-2 rounded-md">
                        <ArrowLeft/>
                </button>
            </div>

            <div className='w-full flex justify-center items-center  text-black'>
                    <h4 className=''>{titulo}</h4>
            </div>
        </div>
    );
}

export default Header;