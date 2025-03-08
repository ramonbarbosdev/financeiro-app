import axios from 'axios';

const API_URL = 'http://localhost:8080/controlefinanceiro'; // Base URL da API
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0MTYzMjE0Nn0.G969BVxwzIjZmbFlRYOS9XqS4PIeMmYDEuJoCUq_-TBCYmvBRed-11DjKXV7XxtSnKQa1fLN01KLPn7KqnAweA'; // Substitua pelo seu token real

// Cria uma instância do Axios com o token configurado
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// Função genérica para fazer chamadas à API
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: endpoint,
      data,
    };
    const resposta = await api(config);
    return resposta.data; // Retorna os dados da resposta
  } catch (error) {
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

// Função para buscar dados
export const fetchDados = async (endpoint) => {
  return await apiRequest('GET', endpoint); // Chama a função genérica com o método GET
};

// Função para criar um novo item
export const criarItem = async (endpoint, novoItem) => {
  return await apiRequest('POST', endpoint, novoItem); // Chama a função genérica com o método POST
};

// Função para atualizar um item existente
export const atualizarItem = async (endpoint, id, itemAtualizado) => {
  return await apiRequest('PUT', `${endpoint}/${id}`, itemAtualizado); // Chama a função genérica com o método PUT
};

// Função para deletar um item
export const deletarItem = async (endpoint, id) => {
  return await apiRequest('DELETE', `${endpoint}/${id}`); // Chama a função genérica com o método DELETE
};