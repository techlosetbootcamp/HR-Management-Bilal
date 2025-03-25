import { LeaveState } from "@/types/leaves";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: LeaveState = {
  leaves: [],
  loading: false,
  error: null,
};

export const fetchLeaves = createAsyncThunk("leave/fetchLeaves", async () => {
  const response = await axios.get("/api/leaves");
  return response.data.leaves;
});

export const submitLeave = createAsyncThunk(
  "leave/submitLeave",
  async ({
    startDate,
    endDate,
    reason,
    employeeId,
  }: {
    startDate: string;
    endDate: string;
    reason: string;
    employeeId: string;
  }) => {
    const response = await axios.post("/api/leaves", {
      startDate,
      endDate,
      reason,
      employeeId,
    });
    return response.data;
  }
);

export const updateLeaveStatus = createAsyncThunk(
  "leave/updateStatus",
  async ({
    leaveId,
    status,
  }: {
    leaveId: string;
    status: "APPROVED" | "REJECTED";
  }) => {
    await axios.patch("/api/leaves", {
      leaveId,
      status,
    });
    return { leaveId, status };
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
        state.error = null;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch leaves";
      })
      .addCase(submitLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitLeave.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to submit leave";
      })
      .addCase(updateLeaveStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = state.leaves?.map((leave) =>
          leave.id === action.payload.leaveId
            ? { ...leave, status: action.payload.status }
            : leave
        );
        state.error = null;
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update leave status";
      });
  },
});

export default leaveSlice.reducer;
