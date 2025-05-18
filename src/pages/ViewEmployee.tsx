import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, ChevronLeft } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { getEmployee } from "../services/employeeService";
import { Employee } from "../types/employee";

const ViewEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id) return;
        const data = await getEmployee(parseInt(id));
        setEmployee(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!employee) return <div className="p-6 text-center">Employee not found</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate("/employees")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">
          View Employee Details
        </h1>
      </div>

      <div>
        <div>
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 pb-2 border-b-2 border-primary">
              <User size={20} className="text-primary" />
              <h2 className="font-semibold text-primary ">
                Personal Information
              </h2>
            </div>
          </div>

          <div className="flex mb-8">
          <div className="h-24 w-24 rounded-md bg-gray-100 border border-gray-300 overflow-hidden flex items-center justify-center">
                  
                  <img
                    src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 ">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-base">{employee.EmployeeName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
              <p className="mt-1 text-base">{employee.EmployeeID}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 md:col-span-2"></div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Department</h3>
              <p className="mt-1 text-base">{employee.Department}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Designation</h3>
              <p className="mt-1 text-base">{employee.Designation}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 md:col-span-2"></div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Project</h3>
              <p className="mt-1 text-base">{employee.Project}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="mt-1 text-base">{employee.Type}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 md:col-span-2"></div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1">
                <StatusBadge status={employee.Status} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
