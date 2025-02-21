import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"; 

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE"; // ✅ Role is required
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "/api/auth/changePassword",
        { oldPassword, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      return response.data.message;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Failed to change password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role, // ✅ Ensure role is explicitly assigned
        };
      } else {
        state.user = null;
      }
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.successMessage = null;
      state.loading = false; // ✅ Ensure loading is reset on logout
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
        state.successMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
