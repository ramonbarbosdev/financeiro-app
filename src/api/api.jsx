import axios from 'axios';

const API_URL = 'http://localhost:8080/controlefinanceiro'; // Base URL da API
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0MjM4NDk3NX0.F2edJNvF67Vih65Ccj0uRb3htck-42QmUePx-6nAuef6SCSA1C3i66JcqLaEQb_KPgUmFy6aaSZWyI4uqrO-8A'


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
    return resposta.data;
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

export const obterSequencia = async (endpoint) =>
{
  return await apiRequest('GET', `/${endpoint}/sequencia`); 
};