import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar() {
  const pathname = useLocation().pathname;
  const isActive = (path) => {
    return pathname === path ? "bg-blue-600 text-white rounded" : "";
  };
  return (
    <div className="bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl font-bold hidden md:block mt-4  italic">
        Inventory Management
      </h1>
      <ul className="flex flex-col mt-5 gap-2 text-xl">
        <Link
          to={"/categories"}
          className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 ${isActive("/categories")}`}
        >
          <FaShoppingCart />
          <span className="hidden md:inline ">Categories</span>
        </Link>
        <Link
          to={"/products"}
          className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 ${isActive("/products")}`}
        >
          <FaUsers />
          <span className="hidden md:inline ">Products</span>
        </Link>
      </ul>
    </div>
  );
}
