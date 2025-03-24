export interface AttendanceData {
  day: string;
  onTime: number;
  late: number;
  absent: number;
}
export interface AttendancePayload {
  employeeId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  breakTime: string | null;
  workingHours: string;
  status: string;
}

export interface AttendanceOverviewProps {
  showViewAll?: boolean;
  showPagination?: boolean;
  searchTerm?: string;
}
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  officeLocation: string;
  city?: string;
  photoURL?: string;
}

export interface AttendanceFormState {
  selectedEmployee: Employee | null;
  showModal: boolean;
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime: string;
  manualWorkingHours: string;
  status: string;
  loading: boolean;
}

export interface Attendance {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  breakTime: string;
  workingHours: string;
  employeeId: string;
  employee: {
    firstName: string;
    lastName: string;
    employeeId: string;
    department: string;
    designation: string;
    employmentType: string;
    officeLocation: string;
    city?: string;
    photoURL?: string;
  };
}

export interface AttendanceState {
  employees: Employee[];
  attendanceRecords: Attendance[];
  attendanceState: AttendanceFormState;
  loading: boolean;
  error: string | null;
}

export interface AttendanceModalFormProps {
  selectedEmployee: Employee | null;
  showModal: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  updateAttendanceState: <K extends keyof AttendanceFormState>(
    field: K,
    value: AttendanceFormState[K]
  ) => void;
  attendanceState: AttendanceFormState;
}
export interface Attendance {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  breakTime: string;
  workingHours: string;
  employeeId: string;
  designation: string;
  employeeName: string;
  type: string;
}

export interface AttendanceRecordsProps {
  attendanceRecords: Attendance[];
  formatDate: (dateString: string) => string;
  formatTime: (timeString: string) => string;
}
