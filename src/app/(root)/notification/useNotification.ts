import { useEffect, useState } from "react";

export interface Notification {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        console.log("📨 Fetched Notifications:", data);
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // A generic function to handle notification actions
  const handleNotificationAction = async (
    id: string,
    action: "read" | "delete"
  ) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error("Action failed");

      if (action === "read") {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      } else if (action === "delete") {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (error) {
      console.error(`Failed to ${action} notification:`, error);
    }
  };

  return { notifications, handleNotificationAction };
}
