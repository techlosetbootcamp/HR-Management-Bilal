"use client";

import { CheckCircle, Trash2, BellRing } from "lucide-react";
import { useNotifications } from "./useNotification";
import LottieAnimation from "@/components/lottieAnimation/LottieAnimation";

export default function Page() {
  const { notifications, handleNotificationAction, loading } =
    useNotifications();

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <BellRing size={40} className="text-blue-600 dark:text-blue-400" />
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">
          Notifications
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LottieAnimation />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400 text-2xl">
            No new notifications 🎉
          </p>
        </div>
      ) : (
        <ul className="space-y-8">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              onClick={() =>
                !notification.isRead &&
                handleNotificationAction(notification.id, "read")
              }
              className={`relative flex items-center justify-between p-6 rounded-2xl border shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-2xl ${
                notification.isRead
                  ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  : "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-600"
              }`}
            >
              <div className="flex items-start gap-6">
                {!notification.isRead && (
                  <CheckCircle
                    className="text-green-500 hover:text-green-600 transition-colors"
                    size={32}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationAction(notification.id, "read");
                    }}
                  />
                )}
                <div>
                  <p className="text-gray-900 dark:text-white text-xl font-semibold">
                    {notification.message}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotificationAction(notification.id, "delete");
                }}
                className="text-red-500 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={28} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
