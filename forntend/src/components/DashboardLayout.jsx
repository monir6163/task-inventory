import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./TopNav";

export default function DashboardLayout() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-900 text-gray-900">
          <Navbar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
