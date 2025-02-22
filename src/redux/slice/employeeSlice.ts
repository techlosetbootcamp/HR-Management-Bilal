import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define Employee Interface
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  designation: string;
  department: string;
  joiningDate: string;
  employmentType: string;
  salarySlip?: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  nationality: string;
  officeLocation: string;
  employeeId: string;
  slackId?: string;
  maritalStatus?: string;
  userName?: string;
  githubId?: string;
  workingDays?: string;
  skypeId?: string;
  appointmentLetter?: string;
  experienceLetter?: string;
  relievingLetter?: string;
  photoURL?: string;
  attendance?: string;
  checkIn?: string;
  checkOut?: string;
}

// Define API Response Type
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// ✅ Fetch Employees
export const fetchEmployees = createAsyncThunk<Employee[], void, { rejectValue: string }>(
  "employee/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/employee");
      if (!response.ok) throw new Error("Failed to fetch employees");
      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add Employee (Supports File Uploads)
export const addEmployee = createAsyncThunk<
  Employee,
  Partial<Employee & { files?: { [key: string]: File } }>,
  { rejectValue: string }
>("employee/add", async (employee, { rejectWithValue }) => {
  try {
    let body: FormData | string;
    const headers: HeadersInit = {};

    // If there are files, use FormData
    if (employee.files && Object.keys(employee.files).length > 0) {
      const formData = new FormData();
      Object.entries(employee).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      body = formData;
    } else {
      body = JSON.stringify(employee);
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch("/api/employee", {
      method: "POST",
      body,
      headers,
    });

    if (!response.ok) {
      const errorData: ApiResponse<Employee> = await response.json();
      throw new Error(errorData.error || "Failed to add employee");
    }

    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Update Employee
export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; updatedData: Partial<Employee> },
  { rejectValue: string }
>("employee/update", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/employee`, {
      method: "PATCH",
      body: JSON.stringify({ id, ...updatedData }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData: ApiResponse<Employee> = await response.json();
      throw new Error(errorData.error || "Failed to update employee");
    }

    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Delete Employee
export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employee/delete", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/employee`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData: ApiResponse<Employee> = await response.json();
      throw new Error(errorData.error || "Failed to delete employee");
    }

    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState: { employees: [] as Employee[], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error occurred";
      })

      // ✅ Add Employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error occurred";
      })

      // ✅ Update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
        if (index !== -1) state.employees[index] = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error occurred";
      })

      // ✅ Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error occurred";
      });
  },
});

export default employeeSlice.reducer;
