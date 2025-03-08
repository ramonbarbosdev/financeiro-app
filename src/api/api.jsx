import axios from 'axios';

const API_URL = 'http://localhost:8080/controlefinanceiro/conta/';
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0MTYzMjE0Nn0.G969BVxwzIjZmbFlRYOS9XqS4PIeMmYDEuJoCUq_-TBCYmvBRed-11DjKXV7XxtSnKQa1fLN01KLPn7KqnAweA'; // Substitua pelo seu token real

// Cria uma instância do Axios com o token configurado
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchDados = async () => {
  try {
    const resposta = await api.get();
    return resposta.data;
  } catch (error) {
    throw error;
  }
};

export const criarItem = async (novoItem) => {
  try {
    const resposta = await api.post('', novoItem);
    return resposta.data;
  } catch (error) {
    throw error;
  }
};

export const atualizarItem = async (id, itemAtualizado) => {
  try {
    const resposta = await api.put(`/${id}`, itemAtualizado);
    return resposta.data;
  } catch (error) {
    throw error;
  }
};

export const deletarItem = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};