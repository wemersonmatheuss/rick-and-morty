import axios from 'axios'

export interface Skin {
  id: number
  skinId: string
  label: string
  imageData: string
}

const api = axios.create({ baseURL: 'http://localhost:8080/api' })

export const getSkins = () => api.get<Skin[]>('/skins')