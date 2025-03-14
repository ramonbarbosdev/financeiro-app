
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
    // TO:DO - FAZER TRATAMENTO NA API
    let msgPadrao = 'Não é possivel continuar com a operação.';
    let status = error.status ?? null;
    // console.log(error)

    if (error )
    {
        if( status == 401)
        {
            return `${msgPadrao} Erro na autenticação: JWT expired - Status ${status}. `;
        }

        if(error.response && error.response.data)
        {
            if( error.response.data.error)
            {
                let retornoErro = error.response.data.error;
                
                return retornoErro

            }

        }
        
        if(error.message)
        {
            return error.message
        }
        
    }
    
    return false;
};


export const refinaColuna = (retornoErro) =>
{
    const match = retornoErro.match(/column "(.*?)"/);
    if (match && match[1])
    {
        const columnName = match[1];
        return columnName;
    }
};

export const refinaViolacaoChaveUnica = (retornoErro) =>
{
    const match = retornoErro.match(/Key \((.*?)\)=\((.*?)\) already exists/);

    if (match && match[1] && match[2])
    {
        const columnName = match[1];
        const value = match[2];
        return `O valor "${value}" já existe para o campo "${columnName}". Por favor, escolha um valor diferente.`;
    }

};
    

export const logError = (error) =>
{
    console.error('Erro registrado:', error);
};