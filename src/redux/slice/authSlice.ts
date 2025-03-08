import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  profilePicture?: string; // ✅ Added profile picture field
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

// ✅ Change Password
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
      return rejectWithValue(
        axios.isAxiosError(error) ? error.response?.data?.error || error.message : "Failed to change password"
      );
    }
  }
);
export const getProfile = createAsyncThunk<User, string>(
  "auth/getProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/auth/register/${userId}`);
      return response.data.user;
    } catch  {
      return rejectWithValue("Failed to fetch profile.");
    }
  }
);
// ✅ Register User
export const registerUser = createAsyncThunk<
  void,
  { name: string; email: string; password: string; role: "ADMIN" | "EMPLOYEE" },
  { rejectValue: string }
>("auth/registerUser", async (formData, { rejectWithValue }) => {
  try {
    await axios.post("/api/auth/register", formData, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return rejectWithValue(
      axios.isAxiosError(error) ? error.response?.data?.error || error.message : "Registration failed. Please try again."
    );
  }
});

// ✅ Update Profile (Name & Profile Picture)
export const updateProfile = createAsyncThunk<
  User,
  { userId: string; name?: string; email?: string; image?: string }
>(
  "auth/updateProfile",
  async ({ userId, name, email, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (email) formData.append("email", email);
      if (image) formData.append("image", image);

      const response = await axios.put(`/api/auth/register/${userId}`, formData);
      return response.data.user;
    } catch {
      return rejectWithValue("Profile update failed.");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload ? { ...action.payload } : null;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
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
      // ✅ Change Password Handlers
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
      })
      
      // ✅ Register User Handlers
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Successfully registered!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Update Profile Handlers
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload } as User;
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
