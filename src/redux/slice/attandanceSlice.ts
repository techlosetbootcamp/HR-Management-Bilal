import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  city?: string;
  photoURL?: string;
}

interface AttendanceFormState {
  selectedEmployee: Employee | null;
  showModal: boolean;
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime: string;
  manualWorkingHours: string;
  status: string;
  loading: boolean;
}

interface Attendance {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  breakTime: string;
  workingHours: string;
  employeeId: string;
}

interface AttendanceState {
  employees: Employee[];
  attendanceRecords: Attendance[];
  attendanceState: AttendanceFormState;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AttendanceState = {
  employees: [],
  attendanceRecords: [],
  attendanceState: {
    selectedEmployee: null,
    showModal: false,
    date: "",
    checkIn: "",
    checkOut: "",
    breakTime: "",
    manualWorkingHours: "",
    status: "",
    loading: false,
  },
  loading: false,
  error: null,
};

// Async thunk to fetch employees
export const fetchEmployees = createAsyncThunk(
  "attendance/fetchEmployees",
  async () => {
    const res = await fetch("/api/employee");
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
  }
);

// Async thunk to fetch attendance records for an employee
export const fetchAttendanceByEmployeeId = createAsyncThunk(
  "attendance/fetchAttendanceByEmployeeId",
  async (employeeId: string) => {
    const res = await fetch(`/api/attendance?employeeId=${employeeId}`);
    if (!res.ok) throw new Error("Failed to fetch attendance data");
    return res.json();
  }
);

// Async thunk to submit attendance
export const submitAttendance = createAsyncThunk(
    "attendance/submitAttendance",
    async (_, { getState }) => {
      const state = getState() as { attendance: AttendanceState };
      const {
        selectedEmployee,
        date,
        status,
        checkIn,
        checkOut,
        breakTime,
        manualWorkingHours,
      } = state.attendance.attendanceState;
  
      if (!selectedEmployee || !status || !date) {
        throw new Error("Employee, date, and status are required!");
      }
  
      const payload = {
        employeeId: selectedEmployee.id,
        date: new Date(date).toISOString(),
        checkIn: checkIn ? new Date(`${date}T${checkIn}:00`).toISOString() : null,
        checkOut: checkOut
          ? new Date(`${date}T${checkOut}:00`).toISOString()
          : null,
        breakTime: breakTime || null,
        workingHours: manualWorkingHours || "0:00",
        status,
      };
  
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error("Failed to submit attendance");
      return res.json();
    }
  );

// Attendance slice
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendanceState: (
      state,
      action: PayloadAction<Partial<AttendanceFormState>>
    ) => {
      state.attendanceState = { ...state.attendanceState, ...action.payload };
    },
    resetAttendanceState: (state) => {
      state.attendanceState = initialState.attendanceState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })

      // Fetch Attendance Records
      .addCase(fetchAttendanceByEmployeeId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendanceByEmployeeId.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchAttendanceByEmployeeId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Failed to fetch attendance records";
      })

      // Submit Attendance
      .addCase(submitAttendance.pending, (state) => {
        state.attendanceState.loading = true;
      })
      .addCase(submitAttendance.fulfilled, (state) => {
        state.attendanceState.loading = false;
        state.attendanceState = initialState.attendanceState;
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        state.attendanceState.loading = false;
        state.error = action.error.message ?? "Failed to submit attendance";
      });
  },
});

export const { setAttendanceState, resetAttendanceState } =
  attendanceSlice.actions;
export default attendanceSlice.reducer;
