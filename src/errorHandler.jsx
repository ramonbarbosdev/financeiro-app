
export const formatarMensagemErro = (error) =>
{
    if (error.response)
    {

        if (error.response.data && error.response.data.error)
        {
            return error.response.data.error; 
        }

        return `Erro: ${error.response.status} - ${error.response.statusText}`; 

    }
    else if (error.request)
    {
       
        return 'Erro: Não foi possível conectar ao servidor.';
    }
    else
    {
       
        return `Erro: ${error.message}`;
    }
};


export const erroEspecifico = (error) => 
{

    if (error )
    {
        // if (error.response.error && error.response.error.includes('duplicate key value'))
        // {
        //     return 'Já existe uma conta com esse código. Por favor, escolha um código diferente.';
        // }
        
        if(error.message)
        {
            return error.message
        }
        
    }
    
    return false;
};

export const logError = (error) =>
{
    console.error('Erro registrado:', error);
};