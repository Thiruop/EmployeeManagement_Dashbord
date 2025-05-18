import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar as CalendarIcon,
  MessageSquare,
  Settings,
  Bell,
} from "lucide-react";
import UserAvatar from "./UserAvatar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 transform border-r border-gray-200 bg-white 
          transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex h-16 items-center px-7 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-500">RS-TECH</h1>
        </div>

        <nav className="mt-6 pr-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-8 py-3 ${
                isActive
                  ? "text-white bg-primary"
                  : "text-gray-500 hover:bg-gray-100"
              } rounded-tr-full rounded-br-full`
            }
            end
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `flex items-center gap-3 px-8 py-3 ${
                isActive
                  ? "text-white bg-primary"
                  : "text-gray-500 hover:bg-gray-100"
              } rounded-tr-full rounded-br-full`
            }
          >
            <Users size={20} />
            <span>Employee</span>
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center gap-3 px-8 py-3 ${
                isActive
                  ? "text-white bg-primary"
                  : "text-gray-500 hover:bg-gray-100"
              } rounded-tr-full rounded-br-full`
            }
          >
            <CalendarIcon size={20} />
            <span>Calendar</span>
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex items-center gap-3 px-8 py-3 ${
                isActive
                  ? "text-white bg-primary"
                  : "text-gray-500 hover:bg-gray-100"
              } rounded-tr-full rounded-br-full`
            }
          >
            <MessageSquare size={20} />
            <span>Messages</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-end border-b border-gray-200 bg-white px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button className="bg-gray-200 rounded-full p-2 hover:text-gray-700">
              <Settings size={20} />
            </button>
            <button className="bg-gray-200 rounded-full p-2 hover:text-gray-700 relative">
              <Bell size={20} />
            </button>
            <UserAvatar
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User"
              size="md"
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
