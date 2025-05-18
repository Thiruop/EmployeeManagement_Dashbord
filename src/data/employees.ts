export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  project: string;
  type: string;
  status: string;
  avatar: string;
}

export const employees: Employee[] = [
  {
    id: "1",
    name: "Arlene Smith",
    employeeId: "671190345",
    department: "Design",
    designation: "Design Lead",
    project: "Car Rental",
    type: "Office",
    status: "Permanent",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  // {
  //   id: '2',
  //   name: 'James Wilson',
  //   employeeId: '583291047',
  //   department: 'Engineering',
  //   designation: 'Frontend Developer',
  //   project: 'E-commerce',
  //   type: 'Remote',
  //   status: 'Contract',
  //   avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  // },
  // {
  //   id: '3',
  //   name: 'Maria Garcia',
  //   employeeId: '492837561',
  //   department: 'Marketing',
  //   designation: 'Marketing Manager',
  //   project: 'Brand Campaign',
  //   type: 'Office',
  //   status: 'Permanent',
  //   avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
  // },
  // {
  //   id: '4',
  //   name: 'Robert Johnson',
  //   employeeId: '761029384',
  //   department: 'Sales',
  //   designation: 'Sales Executive',
  //   project: 'Client Acquisition',
  //   type: 'Remote',
  //   status: 'Part-time',
  //   avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
  // },
  // {
  //   id: '5',
  //   name: 'Emily Chen',
  //   employeeId: '385102764',
  //   department: 'Engineering',
  //   designation: 'Backend Developer',
  //   project: 'API Integration',
  //   type: 'Office',
  //   status: 'Permanent',
  //   avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
  // }
];

export const departments = [
  "Design",
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Customer Support",
];

export const designations = [
  "Design Lead",
  "UX Designer",
  "UI Designer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Project Manager",
  "Marketing Manager",
  "Sales Executive",
  "HR Manager",
  "Finance Analyst",
  "Customer Support Specialist",
];

export const employeeTypes = ["Office", "Remote", "Hybrid"];

export const employeeStatuses = [
  "Permanent",
  "Contract",
  "Part-time",
  "On Leave",
  "Terminated",
];
