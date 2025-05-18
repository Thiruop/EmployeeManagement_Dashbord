import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getEmployees } from "../services/employeeService";
import type { Employee } from "../types/employee";

const Messages = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getEmployees().then(setEmployees).catch(console.error);
  }, []);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Chat list */}
        <div className="md:col-span-1 card p-1 rounded shadow">
          <div className="p-1 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages"
                className="input pl-8 py-1 text-sm"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {employees.map((emp) => (
              <div key={emp.EmployeeID} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"
                  alt={emp.EmployeeName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-800 text-sm">{emp.EmployeeName}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Chat conversation */}
        <div className="md:col-span-2 card flex flex-col h-[250px] p-1 rounded shadow">
          <div className="flex flex-1 items-center justify-center">
            <span className="text-gray-400 text-base">No Conversation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;