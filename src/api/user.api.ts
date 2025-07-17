import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${VITE_API_BASE_URL}/login`, {
        email,
        password,
    });
    return response.data;
}