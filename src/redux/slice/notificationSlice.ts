import { Notification } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error?: string;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: undefined,
};

export const fetchNotifications = createAsyncThunk<Notification[]>(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/notifications");
      return response.data.notifications;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Fetch failed");
      }
      return rejectWithValue("Fetch failed");
    }
  }
);

interface NotificationActionPayload {
  id: string;
  action: "read" | "delete";
}

export const updateNotificationAction = createAsyncThunk<
  NotificationActionPayload,
  NotificationActionPayload
>(
  "notifications/updateNotificationAction",
  async (payload, { rejectWithValue }) => {
    try {
      await axios.post("/api/notifications", payload);
      return payload;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Action failed");
      }
      return rejectWithValue("Action failed");
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action: PayloadAction<Notification[]>) => {
        state.loading = false;
        state.notifications = action.payload;
      }
    );
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      updateNotificationAction.fulfilled,
      (state, action: PayloadAction<NotificationActionPayload>) => {
        const { id, action: act } = action.payload;
        if (act === "read") {
          const notif = state.notifications.find((n) => n.id === id);
          if (notif) {
            notif.isRead = true;
          }
        } else if (act === "delete") {
          state.notifications = state.notifications.filter((n) => n.id !== id);
        }
      }
    );
  },
});

export default notificationsSlice.reducer;
