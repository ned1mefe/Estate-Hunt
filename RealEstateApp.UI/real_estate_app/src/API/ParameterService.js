import axiosInstance from "./AxiosInstance";

export const GetAllStatuses = async () => {
    try {
        const response = await axiosInstance.get(`/Status/list`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching', error);
        throw error;
    }
}
export const AddStatus = async (params) => {
    try {
        const response = await axiosInstance.post('/Status', params);
        return response;
    } catch (error) {
        console.error('Error while fetching', error);
        throw error;
    }
}
export const UpdateStatus = async (params) => {
    try {
        const response = await axiosInstance.put('/Status/', params);
        return response;
    } catch (error) {
        console.error('Error while updating status.', error);
        throw error;
    }
};
export const DeleteStatus = async (id) => {
    try {
        const response = await axiosInstance.delete(`/Status?id=${id}`);
        return response;
    } catch (error) {
        console.error('Error while deleting status.', error);
        throw error;
    }
};



export const GetAllEstateTypes = async () => {
    try {
        const response = await axiosInstance.get(`/EstateType/list`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching', error);
        throw error;
    }
}
export const AddEstateType = async (params) => {
    try {
        const response = await axiosInstance.post('/EstateType', params);
        return response;
    } catch (error) {
        console.error('Error while fetching', error);
        throw error;
    }
}
export const UpdateEstateType = async (params) => {
    try {
        const response = await axiosInstance.put('/EstateType/', params);
        return response;
    } catch (error) {
        console.error('Error while updating estate type.', error);
        throw error;
    }
};
export const DeleteEstateType = async (id) => {
    try {
        const response = await axiosInstance.delete(`/EstateType?id=${id}`);
        return response;
    } catch (error) {
        console.error('Error while deleting estate type.', error);
        throw error;
    }
};



export const GetAllCurrencies = async () => {
    try {
        const response = await axiosInstance.get(`/Currency/list`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching', error);
        throw error;
    }
}
export const AddCurrency = async (params) => {
    try {
        const response = await axiosInstance.post('/Currency', params);
        return response;
    } catch (error) {
        console.error('Error while fetching', error);
        throw error;
    }
}
export const UpdateCurrency = async (params) => {
    try {
        const response = await axiosInstance.put('/Currency/', params);
        return response;
    } catch (error) {
        console.error('Error while updating currency', error);
        throw error;
    }
};
export const DeleteCurrency = async (id) => {
    try {
        const response = await axiosInstance.delete(`/Currency?id=${id}`);
        return response;
    } catch (error) {
        console.error('Error while deleting currency', error);
        throw error;
    }
};