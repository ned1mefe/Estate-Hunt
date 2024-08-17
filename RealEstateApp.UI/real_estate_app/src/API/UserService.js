import axiosInstance from "./AxiosInstance";

export const GetUserInfo = async (userId) => {
    try {
        const response = await axiosInstance.get(`/Auth?id=${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error while fetching user', error);
        throw error;
    }
}