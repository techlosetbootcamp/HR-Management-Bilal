export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  status?: string;
  city?: string;
  photoURL?: string;
  officeLocation?: string;
}
export interface AllEmployeeProps {
  employees: Employee[];
  isAdmin: boolean;
  isAttendancePage?: boolean;
  handleViewEmployee?: (employeeId: string) => void;
  handleEditEmployee?: (employeeId: string) => void;
  handleDeleteEmployee?: (employeeId: string) => void;
  handleMarkAttendance?: (employee: Employee) => void;
}
export interface AccountAccessProps {
  form: {
    email: string;
    slackId: string;
    skypeId: string;
    githubId: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
export interface DocumentsProps {
  handleFileUpload: (file: File, field: string) => void;
}

export type InputFieldType =
  | "number"
  | "email"
  | "select"
  | "date"
  | "password"
  | "text"
  | undefined;

export interface EmployeeDetailsProps {
  id: string;
  isEditMode: boolean;
  employeeEmail: string;
}

export interface EmployeeHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
  isAdmin: boolean;
}

export interface FileUploadProps {
  label: string;
  accept?: string;
  onFileSelect: (file: File) => void;
}
export interface PersonalInfoProps {
  form: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    dateOfBirth: string;
    maritalStatus: string;
    gender: string;
    nationality: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    photoURL?: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleFileUpload: (file: File, field: string) => void;
}

export interface ProfessionalInfoProps {
  form: {
    employeeId: string;
    userName: string;
    employmentType: string;
    email: string;
    department: string;
    designation: string;
    workingDays: string;
    joiningDate: string;
    officeLocation: string;
    status: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
