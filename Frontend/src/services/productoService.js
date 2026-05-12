import axios from 'axios';

// Obtenemos la URL base de las variables de entorno configuradas en Vite
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/productos";

export const productoService = {
    // Obtener todos los productos
    getAll: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    // Obtener un producto por ID
    getById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    // Crear un nuevo producto
    create: async (producto) => {
        const response = await axios.post(API_URL, producto);
        return response.data;
    },

    // Actualizar producto existente
    update: async (id, producto) => {
        const response = await axios.put(`${API_URL}/${id}`, producto);
        return response.data;
    },

    // Eliminar producto
    delete: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }
};