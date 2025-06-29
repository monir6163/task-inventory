import { apiUrl } from "./api";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/product/getAllProducts`);
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
