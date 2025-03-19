"use client";

import { CheckCircle, Trash2 } from "lucide-react";
import { useNotifications } from "./useNotification"; // adjust the path as needed

export default function NotificationsPage() {
  const { notifications, handleNotificationAction } = useNotifications();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Notifications
      </h1>
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No notifications available.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              onClick={() =>
                !notification.isRead &&
                handleNotificationAction(notification.id, "read")
              }
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                notification.isRead
                  ? "bg-gray-100 border-gray-300"
                  : "bg-white border-gray-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-center space-x-3">
                {!notification.isRead && (
                  <CheckCircle
                    className="text-green-500"
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationAction(notification.id, "read");
                    }}
                  />
                )}
                <div>
                  <p className="text-gray-800 text-lg">
                    {notification.message}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotificationAction(notification.id, "delete");
                }}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
