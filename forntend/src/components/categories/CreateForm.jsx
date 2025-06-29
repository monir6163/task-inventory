import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";
import { fetchCategories } from "../../utils/categoryFetch";
import CategoryTable from "./CategoryTable";

export default function CreateForm() {
  const [cat_name, setCatName] = useState("");

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(`${apiUrl}/category/create`, {
        name: cat_name,
      });
      if (response.status) {
        setSuccess("Category created successfully!");
        setCatName("");
        await loadCategories();
      } else {
        setError("Failed to create category.");
      }
    } catch (err) {
      setError(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setCatName(e.target.value);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto bg-slate-100 p-4 rounded sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center mb-10 text-2xl/9 font-bold tracking-tight text-gray-900">
              Create a new Category
            </h2>
          </div>
          {error && (
            <div className="mb-4 text-sm text-red-600">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 text-sm text-green-600">
              <p>{success}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="cat_name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category Name
              </label>
              <div className="mt-2">
                <input
                  id="cat_name"
                  name="cat_name"
                  type="text"
                  value={cat_name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Creating..." : "Create Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4 mb-4"></div>
      <CategoryTable categories={categories} />
    </>
  );
}
