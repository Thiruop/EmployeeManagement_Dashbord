import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import ConfirmationModal from "../components/ConfirmationModal";
import { Employee } from '../types/employee';
import { getEmployees, deleteEmployee } from '../services/employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (!query.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter(
      (employee) =>
        employee.EmployeeName.toLowerCase().includes(query.toLowerCase()) ||
        employee.EmployeeID.toString().includes(query) ||
        employee.Department.toLowerCase().includes(query.toLowerCase()) ||
        employee.Designation.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteEmployee(deleteId);
        const updatedEmployees = employees.filter(
          (employee) => employee.EmployeeID !== deleteId
        );
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
        setDeleteId(null);
      } catch (err) {
        setError('Failed to delete employee. Please try again.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Employee</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 w-full sm:w-64"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
          <Link
            to="/employees/add"
            className="btn bg-primary text-white w-full py-2.5 sm:w-auto whitespace-nowrap"
          >
            <Plus size={18} className="border border-white rounded-full" />
            Add New Employee
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                  Employee Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                  Employee ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                  Department
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                  Designation
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                  Project
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                  Type
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.EmployeeID} className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img
                          src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{employee.EmployeeName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {employee.EmployeeID}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {employee.Department}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {employee.Designation}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {employee.Project}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {employee.Type}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={employee.Status} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/employees/${employee.EmployeeID}`)}
                          className="text-gray-600 hover:text-gray-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => navigate(`/employees/${employee.EmployeeID}/edit`)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.EmployeeID)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default EmployeeList;
