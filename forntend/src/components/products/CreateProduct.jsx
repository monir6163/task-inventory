import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";
import { fetchCategories } from "../../utils/categoryFetch";
import { fetchProducts } from "../../utils/productsFetch";
import ProductsTable from "./ProductsTable";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [products, setProducts] = useState([]);
  const [cat_id, setCatId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "price") {
      setPrice(e.target.value);
    }
    if (e.target.name === "cat_id") {
      setCatId(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("cat_id", cat_id);
    if (image) {
      formData.append("image", image);
    }
    try {
      const res = await axios.post(`${apiUrl}/product/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const response = res.data;
      if (response.status) {
        setSuccess("Product created successfully!");
        setName("");
        setPrice("");
        setCatId("");
        setImage(null);
        setImagePreview("");
        await loadProducts();
        await loadCategories();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create product.");
      }
    } catch (err) {
      setError(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    const data = await fetchProducts();
    if (data?.status) {
      setProducts(data.data || []);
    } else {
      setError("Failed to load products.");
    }
  };
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-12 lg:px-4">
        <div className="sm:mx-auto bg-slate-100 p-4 rounded sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center mb-10 text-2xl/9 font-bold tracking-tight text-gray-900">
              Create Product
            </h2>
          </div>
          {success && (
            <div className="mb-4 text-sm text-green-600">
              <p>{success}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={price}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cat_id"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="cat_id"
                  name="cat_id"
                  value={cat_id}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.cat_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="w-20 h-20 rounded-md"
                  />
                </div>
              )}
            </div>
            {error && (
              <div className="mb-4 text-sm text-red-600">
                <p>{error}</p>
              </div>
            )}

            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4 mb-4"></div>
      <ProductsTable
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
}
