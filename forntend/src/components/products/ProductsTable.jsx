import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";

export default function ProductsTable({ categories, products, setProducts }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (selectedCategory === "") {
          setFilteredProducts(products); // show all
        } else {
          const res = await axios.get(
            `${apiUrl}/product/getProductsByCategory`,
            {
              params: {
                category_id: selectedCategory,
              },
            }
          );
          if (res.data.status) {
            setFilteredProducts(res.data.data);
          } else {
            console.error("API error:", res.data.error);
            setFilteredProducts([]);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };

    fetchProducts();
  }, [selectedCategory, products]);

  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${apiUrl}/product/deleteProduct/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  return (
    <>
      {/* product filter by category_id */}
      <div className="mb-4">
        <label
          htmlFor="categoryFilter"
          className="block text-sm font-medium text-gray-200"
        >
          Filter by Category
        </label>
        <select
          id="categoryFilter"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={selectedCategory}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.cat_name}
            </option>
          ))}
        </select>
      </div>

      {/* product table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  className="border-b bg-gray-900 border-gray-800"
                  key={index}
                >
                  <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                    {categories?.find((cat) => cat.id === product.category_id)
                      ?.cat_name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                    {product.image ? (
                      <img
                        src={`https://task-inventory-sigma.vercel.app/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900 ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
