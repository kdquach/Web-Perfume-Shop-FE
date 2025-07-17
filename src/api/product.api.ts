import axios from "axios";
import type { ProductInterface } from "../components/interfaces/interfaces";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface DeleteProductResponse {
    success: boolean;
    message?: string;
    error?: string;
}

// Lấy danh sách sản phẩm có phân trang
export const getAllProducts = async ({
    page,
    limit
}: {
    page: number;
    limit: number
}): Promise<{ data: ProductInterface[]; total: number }> => {
    try {
        const response = await axios.get(`${VITE_API_BASE_URL}/products`, {
            params: {
                page,
                limit
            }
        });

        const data = response.data.data || [];
        const total = response.data.pagination?.total || data.length;

        return {
            data,
            total
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { data: [], total: 0 };
    }
};


// Xóa sản phẩm
export const deleteProduct = async (id: string): Promise<DeleteProductResponse> => {
    try {
        const response = await axios.delete(`${VITE_API_BASE_URL}/products/${id}`);

        return {
            success: true,
            message: response.data.message || "Product deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting product:", error);

        return {
            success: false,
            error: axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : "Failed to delete product"
        };
    }
}