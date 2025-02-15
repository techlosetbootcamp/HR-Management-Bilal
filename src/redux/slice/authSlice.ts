import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Async thunk for changing password
// import { createAsyncThunk } from "@reduxjs/toolkit";

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      console.log("🔹 Sending Change Password Request", { oldPassword, newPassword });

      const response = await fetch("/api/auth/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      console.log("🔹 Response Status:", response.status);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Unexpected response format: ${await response.text()}`);
      }

      const data = await response.json();
      console.log("🔹 Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      return data.message;
    } catch (error: any) {
      console.error("❌ Change Password Error:", error);
      return rejectWithValue(error.message);
    }
  }
);





// Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null;
      state.successMessage = null;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.successMessage = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // Success message from API
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Error message from API
      });
  },
});

export const { setUser, logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
