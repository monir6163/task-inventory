import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import Categories from "../pages/categories";
import Products from "../pages/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: (
          <h1 className="text-2xl text-center mt-10">
            Welcome to the Inventory Management System
          </h1>
        ),
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);
