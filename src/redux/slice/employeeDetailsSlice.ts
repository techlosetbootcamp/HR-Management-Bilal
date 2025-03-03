import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface Employee {
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
}

interface EmployeeState {
  employee: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employee: null,
  loading: false,
  error: null,
};

// Fetch Employee Details
export const fetchEmployeeById = createAsyncThunk(
  "employeeDetails/fetchEmployeeById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/employee/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Employee not found");
      return await res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Employee Details
export const updateEmployeeDetails = createAsyncThunk(
  "employeeDetails/updateEmployeeDetails",
  async ({ id, updates }: { id: string; updates: Partial<Employee> }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/employee/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update employee details");
      return await res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const employeeDetailsSlice = createSlice({
  name: "employeeDetails",
  initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee>) {
      state.employee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload as string;
      });
  },
});

export const { setEmployee } = employeeDetailsSlice.actions;
export default employeeDetailsSlice.reducer;
export const selectEmployeeDetails = (state: RootState) => state.employeeDetails;
