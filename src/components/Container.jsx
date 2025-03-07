
function Container({ children, width = 'w-1/4', height = 'h-1/2' }) 
{


    return(
        <div className={`bg-white p-6 rounded-lg shadow-lg ${width} ${height} flex flex-col gap-10`}>
           
            {children} 

        </div>
    );
}

export default Container;