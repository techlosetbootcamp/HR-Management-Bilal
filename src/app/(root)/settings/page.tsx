'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/slice/themeSlice";
import { RootState } from "@/redux/store";

export default function Settings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [mobilePushEnabled, setMobilePushEnabled] = useState(true);
  const [desktopNotificationEnabled, setDesktopNotificationEnabled] = useState(true);
  const [emailNotificationEnabled, setEmailNotificationEnabled] = useState(true);

  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    if (selectedTheme !== theme) {
      dispatch(toggleTheme());
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="w-full bg-[#1A1A1A] rounded-lg p-6 text-white">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-1">Appearance</h3>
          <p className="text-sm text-gray-400">
            Customize how your theme looks on your device
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm">Theme</span>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="bg-gray-800 rounded-lg px-3 py-1 text-sm text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-1">Language</h3>
          <p className="text-sm text-gray-400">Select your language</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm">English</span>
            <button className="bg-gray-800 rounded-lg px-3 py-1 text-sm flex items-center">
              English
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-1">
              Two-factor Authentication
            </h3>
            <p className="text-sm text-gray-400">
              Keep your account secure by enabling 2FA via mail
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-1">
              Mobile Push Notifications
            </h3>
            <p className="text-sm text-gray-400">Receive push notification</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={mobilePushEnabled}
              onChange={() => setMobilePushEnabled(!mobilePushEnabled)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-1">Desktop Notification</h3>
            <p className="text-sm text-gray-400">
              Receive push notification in desktop
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={desktopNotificationEnabled}
              onChange={() =>
                setDesktopNotificationEnabled(!desktopNotificationEnabled)
              }
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-1">Email Notifications</h3>
            <p className="text-sm text-gray-400">Receive email notification</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailNotificationEnabled}
              onChange={() =>
                setEmailNotificationEnabled(!emailNotificationEnabled)
              }
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
