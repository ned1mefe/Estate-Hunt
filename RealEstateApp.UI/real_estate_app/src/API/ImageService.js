import axiosInstance from "./AxiosInstance";

export const GetImagesOfEstate = async (estateId) => {
    try {
        const response = await axiosInstance.get(`/Image/list?estateId=${estateId}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching images', error);
        throw error;
    }
}

export const DeleteImage = async (imageId) => {
    try {
        const response = await axiosInstance.delete(`/Image?id=${imageId}`);
        return response;
    } catch (error) {
        console.error('Error while deleting image', error);
        throw error;
    }
}

export const AddImages = async (images) => {
    try {
        const response = await axiosInstance.post('/Image/add_multiple', images);
        return response;
    } catch (error) {
        console.error('Error during adding images:', error);
        throw error;
    }
}