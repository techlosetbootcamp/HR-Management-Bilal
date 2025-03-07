import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  relivingLetter?: string;
  photoURL?: string;
  attendance?: string;
  status?: string;
  checkOut?: string;
  photoPublicId?: string;
}

// Define API Response Type
// interface ApiResponse<T> {
//   data?: T;
//   error?: string;
// }

// ✅ Fetch Employees
export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string }
>("employee/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/employee");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || error.message);
      }
    }
});

export const addEmployee = createAsyncThunk<
  Employee,
  Partial<Employee & { files?: { [key: string]: File } }>,
  { rejectValue: string }
>("employee/add", async (employee, { rejectWithValue }) => {
  try {
    let body: FormData | Partial<Employee>;
    const headers: HeadersInit = {};

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
      body = employee;
      headers["Content-Type"] = "application/json";
    }

    const response = await axios.post("/api/employee", body, { headers });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || error.message);
      }
    }
});
export const fetchEmployeeById = createAsyncThunk(
  "employeeDetails/fetchEmployeeById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/employee/${encodeURIComponent(id)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data?.error || error.message);
        }
      }
  }
);
// Update Employee Details
export const updateEmployeeDetails = createAsyncThunk(
  "employeeDetails/updateEmployeeDetails",
  async (
    { id, updates }: { id: string; updates: Partial<Employee> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `/api/employee/${encodeURIComponent(id)}`,
        updates
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data?.error || error.message);
        }
      }
  }
);

// ✅ Update Employee
export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; updatedData: Partial<Employee> },
  { rejectValue: string }
>("employee/update", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/api/employee`, { id, ...updatedData });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || error.message);
      }
    }
});
// ✅ Delete Employee
export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employee/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/employee`, { data: { id } });
    return id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [] as Employee[],
    employee: null as Employee | null,
    loading: false,
    error: null as string | null,
    filters: { department: "", designation: "", city: "" },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
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
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEmployeeDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployeeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = { ...state.employee, ...action.payload };
      })
      .addCase(updateEmployeeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to update employee details";
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
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id
        );
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
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error occurred";
      });
  },
});
export const { setFilters } = employeeSlice.actions;
export default employeeSlice.reducer;
