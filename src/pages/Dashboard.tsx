import { PieChart, BarChart, Users, Briefcase, Building2, CircleDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { employees } from '../data/employees';

const Dashboard = () => {
  // Count employees by department
  const departmentCounts = employees.reduce((acc, employee) => {
    acc[employee.department] = (acc[employee.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count employees by status
  const statusCounts = employees.reduce((acc, employee) => {
    acc[employee.status] = (acc[employee.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    { 
      title: 'Total Employees', 
      value: employees.length,
      icon: <Users className="text-blue-500" />,
      color: 'bg-blue-50 text-blue-700'
    },
    { 
      title: 'Departments', 
      value: Object.keys(departmentCounts).length,
      icon: <Building2 className="text-emerald-500" />,
      color: 'bg-emerald-50 text-emerald-700'
    },
    { 
      title: 'Projects', 
      value: new Set(employees.map(e => e.project)).size,
      icon: <Briefcase className="text-violet-500" />,
      color: 'bg-violet-50 text-violet-700'
    },
    { 
      title: 'Avg. Salary', 
      value: '$75,000',
      icon: <CircleDollarSign className="text-amber-500" />,
      color: 'bg-amber-50 text-amber-700'
    }
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color.split(' ')[0]}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts and tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Department Distribution</h2>
            <div className="p-1.5 rounded bg-blue-50">
              <PieChart size={18} className="text-blue-500" />
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(departmentCounts).map(([dept, count], index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{dept}</span>
                  <span className="text-gray-500">{count} employees</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(count / employees.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Employee Status</h2>
            <div className="p-1.5 rounded bg-emerald-50">
              <BarChart size={18} className="text-emerald-500" />
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count], index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{status}</span>
                  <span className="text-gray-500">{count} employees</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(count / employees.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent employees */}
      <div className="card">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Recent Employees</h2>
          <Link to="/employees" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Employee Name</th>
                <th className="table-header">Employee ID</th>
                <th className="table-header">Department</th>
                <th className="table-header">Designation</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 3).map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <img 
                        src={employee.avatar} 
                        alt={employee.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span>{employee.name}</span>
                    </div>
                  </td>
                  <td className="table-cell">{employee.employeeId}</td>
                  <td className="table-cell">{employee.department}</td>
                  <td className="table-cell">{employee.designation}</td>
                  <td className="table-cell">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'Permanent' ? 'bg-green-100 text-green-800' :
                      employee.status === 'Contract' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;