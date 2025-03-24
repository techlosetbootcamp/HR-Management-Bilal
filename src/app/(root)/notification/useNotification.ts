import {
  fetchNotifications,
  handleNotificationAction,
} from "@/redux/slice/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export function useNotifications() {
  const dispatch = useAppDispatch();
  const { notifications, loading } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return {
    notifications,
    handleNotificationAction: (id: string, action: "read" | "delete") =>
      dispatch(handleNotificationAction({ id, action })),
    loading,
  };
}
