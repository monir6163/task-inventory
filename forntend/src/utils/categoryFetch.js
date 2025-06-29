import { apiUrl } from "./api";

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${apiUrl}/category/getAll`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
