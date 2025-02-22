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
  salarySlip: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  nationality: string;
  officeLocation: string;
  employeeId: string;
  slackId: string;
  maritalStatus: string;
  userName: string;
  githubId: string;
  workingDays: string;
  skypeId: string;
  appointmentLetter: string;
  experienceLetter: string;
  relivingLetter: string;
  photoURL: string;
  attendance: string;
  checkIn: string;
  checkOut: string;
}

// ✅ Fetch Employees
export const fetchEmployees = createAsyncThunk("employee/fetch", async () => {
  const response = await fetch("/api/employee"); // Updated correct API route
  if (!response.ok) throw new Error("Failed to fetch employee");
  return response.json();
});

// ✅ Add Employee
export const addEmployee = createAsyncThunk(
  "employee/add",
  async (employee: Partial<Employee>, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/employee", {
        method: "POST",
        body: JSON.stringify(employee),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to add employee");
      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update Employee
export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, updatedData }: { id: string; updatedData: Partial<Employee> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/employee`, {
        method: "PATCH",
        body: JSON.stringify({ id, ...updatedData }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to update employee");
      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/employee`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete employee");
      return id; // Return the deleted employee's ID
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState: { employees: [] as Employee[], loading: false, error: null },
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export default employeeSlice.reducer;
