import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CategoryPayload {
    name: string;
    description?: string;
}

interface UpdateCategoryPayload {
    id: string;
    name: string;
    description?: string;
}

export const getAllcategories = async () => {
    const response = await axios.get(`${VITE_API_BASE_URL}/categories`);
    return response.data;
}

export const addNewCategory = async (payload: CategoryPayload) => {
    try {
        const response = await axios.post(`${VITE_API_BASE_URL}/create-new-category`, payload);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error);
        throw error;
    }

}

interface UpdateCategoryPayload {
    id: string;
    name: string;
    description?: string;
}

export const editCategory = async (payload: UpdateCategoryPayload) => {
    const { id, ...data } = payload; // tách id ra, chỉ gửi name + description

    try {
        const response = await axios.put(`${VITE_API_BASE_URL}/update-category/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi sửa danh mục:", error);
        throw error;
    }
};

export const deleteCategory = async (id: string) => {
    try {
        const response = await axios.delete(`${VITE_API_BASE_URL}/delete-category/${id}`);
        return response;
    } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
        throw error;
    }
};
