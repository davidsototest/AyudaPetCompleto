// userService.ts
import axios from "axios";

const API_URL = process.env.REACT_APP_LOCAL_URL;

// Obtener la cantidad de usuarios registrados, devuelve un numero entero
export const getUserCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/userCount`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    throw error;
  };
};

// Obtener un usuario por ID
export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData: any) => {
  try {
    const response = await axios.post("/api/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await axios.put(`/api/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};
