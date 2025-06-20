import axios from "axios";
import { TestCategory } from "../types/testCategory";

export const getAllCategories = async (): Promise<TestCategory[]> => {
  try {
    const response = await axios.get<TestCategory[]>("/exam/all-categories");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Ошибка при получении категорий"
    );
  }
};
