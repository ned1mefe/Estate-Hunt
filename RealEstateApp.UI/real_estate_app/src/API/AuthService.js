import { useAuth } from './AuthContext';
import axiosInstance from './AxiosInstance';

export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/Auth/login', credentials);
        const token = response.data.token.result;

        localStorage.setItem('authToken', token);

        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('authToken');
};

export const register = async (credentials) => {
    try {
        const response = await axiosInstance.post('/Auth/register', credentials);

        return response;
    } catch (error) {
        console.error('Error during register:', error);
        throw error;
    }
};
