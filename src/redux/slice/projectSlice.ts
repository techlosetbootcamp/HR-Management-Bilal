import { Project, ProjectsState } from "@/types/projects";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: string }
>("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/projects");
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return rejectWithValue("Response data is not an array");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const addProject = createAsyncThunk<
  Project,
  Partial<Omit<Project, "id" | "status">>,
  { rejectValue: string }
>("projects/addProject", async (newProjectData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/projects", newProjectData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const fetchEmployeeProjects = createAsyncThunk<
  Project[],
  string, // employee id
  { rejectValue: string }
>(
  "employeeProjects/fetchEmployeeProjects",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/projects?employeeId=${employeeId}`
      );
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return rejectWithValue("Response data is not an array");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const completeProject = createAsyncThunk<
  Project,
  string, // project id
  { rejectValue: string }
>(
  "employeeProjects/completeProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/projects?id=${projectId}&action=complete`
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

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch projects";
      })
      // Add Project
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add project";
      })

      .addCase(fetchEmployeeProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchEmployeeProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch projects";
      })
      // Handle completing a project
      .addCase(completeProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(completeProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to complete project";
      });
  },
});

export default projectSlice.reducer;
