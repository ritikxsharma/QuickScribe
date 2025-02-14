import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_SOCKET_URL || window.location.origin
})

export const getNote = (name) => API.get(`/api/${name}`)
export const createNote = (name) => API.post(`/api/${name}`)
export const updateNote = (name, content) => API.put(`/api/${name}`, content)