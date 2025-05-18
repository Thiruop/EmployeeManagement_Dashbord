import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Camera, Edit, Save, User } from "lucide-react";
import PageHeader from "../components/PageHeader";
import {
  departments,
  designations,
  employeeTypes,
  employeeStatuses,
} from "../data/employees";
import { getEmployee, updateEmployee } from "../services/employeeService";

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    EmployeeID: "",
    EmployeeName: "",
    Department: "",
    Designation: "",
    Project: "",
    Type: "",
    Status: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id) return;
        const employee = await getEmployee(parseInt(id));
        setFormData({
          EmployeeID: employee.EmployeeID.toString(),
          EmployeeName: employee.EmployeeName,
          Department: employee.Department,
          Designation: employee.Designation,
          Project: employee.Project,
          Type: employee.Type,
          Status: employee.Status,
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

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
    setSubmitting(true);
    setError(null);

    try {
      if (!id) return;
      
      // Remove EmployeeID from the update data since it shouldn't be changed
      const { EmployeeID, ...updateData } = formData;
      
      await updateEmployee(parseInt(id), {...updateData, EmployeeID: EmployeeID});
      navigate(`/employees/${id}`);
    } catch (err) {
      setError('Failed to update employee. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="animate-fade-in">
      <PageHeader title="Edit Employee" backLink={`/employees/${id}`} />

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
                  className="absolute right-1 bottom-1.5 p-1.5 bg-primary rounded-full cursor-pointer"
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
                  disabled
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

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="btn bg-primary text-white px-6 py-2.5 flex items-center gap-2"
              >
                {submitting ? (
                  "Saving..."
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
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

export default EditEmployee;
