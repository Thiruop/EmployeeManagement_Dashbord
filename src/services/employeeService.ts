import { Employee } from '../types/employee';

const API_BASE_URL = 'http://localhost:3000';

export const getEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employees`);
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const getEmployee = async (employeeId: number): Promise<Employee> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${employeeId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch employee');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee:', error);
        throw error;
    }
};

export const createEmployee = async (employeeData: Omit<Employee, 'EmployeeID'>): Promise<Employee> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
            throw new Error('Failed to create employee');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

export const deleteEmployee = async (employeeId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${employeeId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete employee');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};

export const updateEmployee = async (employeeId: number, employeeData: Partial<Employee>): Promise<Employee> => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
            throw new Error('Failed to update employee');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
}; 