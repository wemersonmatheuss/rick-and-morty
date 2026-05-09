import axios from 'axios';

export interface Character {
  id?: number;
  name: string;
  species: string;
  status: string;
  origin: string;
  imageName: string;
  imageData: string;
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getAll = () => api.get<Character[]>('/characters');
export const getById = (id: number) => api.get<Character>(`/characters/${id}`);
export const create = (data: Character) => api.post<Character>('/characters', data);
export const update = (id: number, data: Character) => api.put<Character>(`/characters/${id}`, data);
export const remove = (id: number) => api.delete(`/characters/${id}`);