import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  profilePicture?: string;
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
  "password/change",
  async ({ email, newPassword }: { email: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const res = await axios.put("/api/changePassword", { email, newPassword });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error) && error.response
          ? error.response.data.message
          : "Failed to change password"
      );
    }
  }
);


// ✅ Get Profile by Email
export const getProfileByEmail = createAsyncThunk<User, string>(
  "auth/getProfileByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/auth/register?email=${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : "Failed to fetch profile by email"
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
    } catch {
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
      axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : "Registration failed. Please try again."
    );
  }
});

// ✅ Upload Profile Image
export const uploadProfileImage = createAsyncThunk<
  string,
  File,
  { rejectValue: string }
>("auth/uploadProfileImage", async (file, { rejectWithValue }) => {
  try {
    const imageData = new FormData();
    imageData.append("file", file);

    const response = await axios.post("/api/upload", imageData);
    return response.data.imageUrl;
  } catch (error) {
    return rejectWithValue(
      axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : "Image upload failed"
    );
  }
});

// ✅ Update Profile (Name & Profile Picture)
export const updateProfile = createAsyncThunk<
  User,
  { name: string; email: string; profilePicture: string },
  { rejectValue: string }
>(
  "auth/updateProfile",
  async ({ name, email, profilePicture }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/api/auth/register",
        { name, email, profilePicture },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : "Profile update failed"
      );
    }
  }
);

// Add this interface for employee data
interface Employee {
  id: string;
  email: string;
  [key: string]: unknown; // For other employee properties
}

// ✅ Get Employee by Email
export const getEmployeeByEmail = createAsyncThunk<
  Employee,
  string,
  { rejectValue: string }
>("auth/getEmployeeByEmail", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/employee?email=${email}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : "Failed to fetch employee by email"
    );
  }
});

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
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Password changed successfully!";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Get Profile By Email Handlers
      .addCase(getProfileByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfileByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Get Profile Handlers
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
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

      // ✅ Upload Profile Image Handlers
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
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
        state.user = action.payload;
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