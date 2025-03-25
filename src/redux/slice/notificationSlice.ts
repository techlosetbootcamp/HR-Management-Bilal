import { NotificationsState } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      return data.notifications;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleNotificationAction = createAsyncThunk(
  "notifications/handleNotificationAction",
  async (
    { id, action }: { id: string; action: "read" | "delete" },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error("Action failed");
      return { id, action };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleNotificationAction.fulfilled, (state, action) => {
        const { id, action: notificationAction } = action.payload;
        if (notificationAction === "read") {
          state.notifications = state.notifications?.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          );
        } else if (notificationAction === "delete") {
          state.notifications = state.notifications.filter((n) => n.id !== id);
        }
      });
  },
});

export default notificationsSlice.reducer;
