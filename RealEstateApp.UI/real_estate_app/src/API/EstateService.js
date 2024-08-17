import axiosInstance from "./AxiosInstance";

export const GetPageEstates = async (page, filters = {}) => {
    try {
        let query = `/Estate/page?page=${page}`;

        // Filtreleri query string olarak ekle
        if (filters.statusId) {
            query += `&statusId=${filters.statusId}`;
        }
        if (filters.typeId) {
            query += `&typeId=${filters.typeId}`;
        }
        // Diğer filtreler de buraya eklenebilir

        const response = await axiosInstance.get(query);
        return response.data;
    } catch (error) {
        console.error('Error while fetching', error);
        throw error;
    }
};

export const GetEstateInfo = async (estateId) => {
    try {
        const response = await axiosInstance.get(`/Estate?id=${estateId}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching', error);
        throw error;
    }
}

export const DeleteEstate = async (estateId) => {
    try {
        const response = await axiosInstance.delete(`/Estate?id=${estateId}`);
        return response.data;
    } catch (error) {
        console.error('Error while deleting', error);
        throw error;
    }
}

export const AddEstate = async (params) => {
    try {
        const response = await axiosInstance.post('/Estate', params);
        return response;
    } catch (error) {
        console.error('Error during adding estate:', error);
        throw error;
    }
}

export const EditEstate = async (params) => {
    try {
        const response = await axiosInstance.put('/Estate', params);
        return response;
    } catch (error) {
        console.error('Error during adding estate:', error);
        throw error;
    }
}

export const GetUsersEstates = async () => {
    try {
        const response = await axiosInstance.get('/Estate/listOfUser')
        return response.data
    } catch (error) {
        console.error('Error fetching user\'s estates:', error);
        throw error;
    }
}