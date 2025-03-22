import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      return data.notifications;
    } catch  {
      return rejectWithValue("Failed to fetch notifications");
    }
  }
);

// Handle notification actions (read/delete)
export const handleNotificationAction = createAsyncThunk(
  "notifications/action",
  async ({ id, action }: { id: string; action: "read" | "delete" }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });

      if (!res.ok) throw new Error("Action failed");

      return { id, action };
    } catch  {
      return rejectWithValue(`Failed to ${action} notification`);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle Notification Actions
      .addCase(handleNotificationAction.fulfilled, (state, action) => {
        const { id, action: notificationAction } = action.payload;
        if (notificationAction === "read") {
          state.notifications = state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          );
        } else if (notificationAction === "delete") {
          state.notifications = state.notifications.filter((n) => n.id !== id);
        }
      })
      .addCase(handleNotificationAction.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default notificationSlice.reducer;
