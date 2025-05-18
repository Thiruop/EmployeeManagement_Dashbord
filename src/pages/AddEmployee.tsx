import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Edit, Save, User } from "lucide-react";
import PageHeader from "../components/PageHeader";
import {
  departments,
  designations,
  employeeTypes,
  employeeStatuses,
} from "../data/employees";
import { createEmployee } from "../services/employeeService";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    EmployeeID: "",
    EmployeeName: "",
    Department: "",
    Designation: "",
    Project: "",
    Type: "",
    Status: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createEmployee(formData);
      navigate("/employees");
    } catch (err) {
      setError("Failed to create employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Add New Employee" backLink="/employees" />

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="text-md border-b-[3px] py-1 border-primary  inline-flex items-center gap-2 text-primary font-bold mb-4">
              <span>
                <User size={18} />
              </span>
              Personal Information
            </h2>

            {/* Photo upload */}
            <div className="mb-6 flex">
              <div className="relative">
                <div className="h-24 w-24 rounded-md bg-gray-100 border border-gray-300 overflow-hidden flex items-center justify-center">
                  
                    <img
                      src={imagePreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  
                </div>
                <label
                  htmlFor="photo-upload"
                  className="absolute -right-2 -bottom-2 p-1.5 bg-primary rounded-full cursor-pointer"
                >
                  <Edit size={16} className="text-white" />
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="EmployeeID"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Employee ID<span className="text-red-500">*</span>
                </label>
                <input
                  id="EmployeeID"
                  name="EmployeeID"
                  type="text"
                  value={formData.EmployeeID}
                  onChange={handleChange}
                  required
                  placeholder="Enter employee ID"
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="EmployeeName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="EmployeeName"
                  name="EmployeeName"
                  type="text"
                  value={formData.EmployeeName}
                  onChange={handleChange}
                  required
                  placeholder="Enter name"
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="Department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department<span className="text-red-500">*</span>
                </label>
                <select
                  id="Department"
                  name="Department"
                  value={formData.Department}
                  onChange={handleChange}
                  required
                  className="select"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="Designation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Designation<span className="text-red-500">*</span>
                </label>
                <select
                  id="Designation"
                  name="Designation"
                  value={formData.Designation}
                  onChange={handleChange}
                  required
                  className="select"
                >
                  <option value="">Select designation</option>
                  {designations.map((designation, index) => (
                    <option key={index} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="Project"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project
                </label>
                <input
                  id="Project"
                  name="Project"
                  type="text"
                  value={formData.Project}
                  onChange={handleChange}
                  placeholder="Enter Project"
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="Type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type<span className="text-red-500">*</span>
                </label>
                <select
                  id="Type"
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  required
                  className="select"
                >
                  <option value="">Select Type</option>
                  {employeeTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="Status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status<span className="text-red-500">*</span>
                </label>
                <select
                  id="Status"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  required
                  className="select"
                >
                  <option value="">Select Status</option>
                  {employeeStatuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn bg-primary text-white px-6 py-2.5 flex items-center gap-2"
              >
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save size={18} />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
