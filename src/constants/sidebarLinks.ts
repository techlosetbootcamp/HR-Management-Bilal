import { LayoutDashboard, Users ,CalendarCheck,NotepadText, Settings  } from 'lucide-react';

  export const SIDE_BAR_LINKS = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      alt: "iconApps",
    },
    {
      name: "All Employees",
      path: "/employees",
      icon: Users ,
      alt: "iconUsers",
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: CalendarCheck ,
      alt: "iconCalender",
    },
    {
      name: "Leaves",
      path: "/leaves",
      icon: NotepadText ,
      alt: "iconNotepad",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings ,
      alt: "iconSettings",
    },
  ];
  