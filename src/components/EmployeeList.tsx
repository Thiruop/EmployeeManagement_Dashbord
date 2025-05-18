import { useEffect, useState } from 'react';
import { Employee } from '../types/employee';
import { getEmployees } from '../services/employeeService';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch employees');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Department</th>
                            <th className="px-4 py-2 border">Designation</th>
                            <th className="px-4 py-2 border">Project</th>
                            <th className="px-4 py-2 border">Type</th>
                            <th className="px-4 py-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.EmployeeID}>
                                <td className="px-4 py-2 border">{employee.EmployeeID}</td>
                                <td className="px-4 py-2 border">{employee.EmployeeName}</td>
                                <td className="px-4 py-2 border">{employee.Department}</td>
                                <td className="px-4 py-2 border">{employee.Designation}</td>
                                <td className="px-4 py-2 border">{employee.Project}</td>
                                <td className="px-4 py-2 border">{employee.Type}</td>
                                <td className="px-4 py-2 border">{employee.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; 