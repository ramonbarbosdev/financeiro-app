function ContainerMain({ children}) 
{
    return(
        <div className='bg-fundo-container w-screen h-screen flex items-center justify-center'>
            {children} 
        </div>
    );
}

export default ContainerMain;