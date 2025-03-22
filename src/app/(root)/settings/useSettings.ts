import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/slice/themeSlice";
import { RootState } from "@/redux/store";

export function useSettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [mobilePushEnabled, setMobilePushEnabled] = useState(true);
  const [desktopNotificationEnabled, setDesktopNotificationEnabled] =
    useState(true);
  const [emailNotificationEnabled, setEmailNotificationEnabled] =
    useState(true);

  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    if (selectedTheme !== theme) {
      dispatch(toggleTheme());
    }
  };
  return {
    theme,
    handleThemeChange,
    twoFactorEnabled,
    mobilePushEnabled,
    desktopNotificationEnabled,
    setTwoFactorEnabled,
    setMobilePushEnabled,
    setEmailNotificationEnabled,
    setDesktopNotificationEnabled,
    emailNotificationEnabled,
  };
}
