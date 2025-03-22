import { Employee } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const updateEmployeeDetails = createAsyncThunk(
  "employeeDetails/updateEmployeeDetails",
  async (
    { id, updates }: { id: string; updates: Partial<Employee> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `/api/employee/${encodeURIComponent(id)}`,
        updates,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

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

export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employee/delete", async (id, { rejectWithValue }) => {
  try {
    console.log("Sending DELETE request for ID:", id);

    await axios.delete(`/api/employee?id=${encodeURIComponent(id)}`);

    console.log("Successfully deleted employee");

    return id;
  } catch (error) {
    console.error("Failed to delete employee:", error);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const uploadImage = createAsyncThunk(
  "employee/uploadImage",
  async (
    { file, fieldName }: { file: File; fieldName: string },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "default_preset"
      );

      const isPDF = file.type === "application/pdf";
      const resourceType = isPDF ? "raw" : "image";

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        formData
      );

      return {
        secure_url: response.data.secure_url,
        fieldName,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);
export const fetchByDepartment = createAsyncThunk<
  Employee[],
  string,
  { rejectValue: string }
>("employees/fetchByDepartment", async (department, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/employee?department=${department}`);
    if (!response.ok) throw new Error("Failed to fetch employees");
    return await response.json();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
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
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.employee) {
          state.employee = {
            ...state.employee,
            [action.payload.fieldName]: action.payload.secure_url,
          };
        }
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to upload image";
      })
      .addCase(fetchByDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchByDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchByDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch employees";
      });
  },
});

export const { setFilters } = employeeSlice.actions;
export default employeeSlice.reducer;
