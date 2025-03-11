import axios from 'axios';

const API_URL = 'http://localhost:8080/controlefinanceiro'; // Base URL da API
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0MTc3MzUzNH0.QlHrhmihInvEA8MScDMXMdxhdQjg3hxrJrUjko4Czgqd0aujkSGjJ99Ksl9HG3YtxTT2I4H6cuBa2RuLkYcHVw'; // Substitua pelo seu token real


const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});


const apiRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: endpoint,
      data,
    };
    const resposta = await api(config);
    return resposta.data; // Retorna os dados da resposta
  }
  catch (error)
  {
    return error
  }
};

export const fetchDados = async (endpoint, id = null) => 
{
  if(id)
  {
    return await apiRequest('GET', `/${endpoint}/${id}`); 
  }

  return await apiRequest('GET', `/${endpoint}/`); 
};

export const criarItem = async (endpoint, novoItem) => {
  return await apiRequest('POST', `/${endpoint}/`, novoItem); 
};

export const atualizarItem = async (endpoint, itemAtualizado) => {
  return await apiRequest('PUT', `/${endpoint}/`, itemAtualizado);
};

export const deletarItem = async (endpoint, id) => {
  return await apiRequest('DELETE', `/${endpoint}/${id}`); 
};