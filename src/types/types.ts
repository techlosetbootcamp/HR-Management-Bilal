
export interface InputProps {
  type: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface SidebarProps {
  activePath: string | null;
  onClose: () => void;
}

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export interface InputFieldProps {
  label?: string; // New prop to control label display
  type?: "text" | "email" | "password" | "date" | "number" | "select";
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  isEditMode?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  showLabel?: boolean; // New prop to control label display
  className?: string;
  disabled?: boolean;
}
export interface HeaderProps {
  onMenuClick: () => void;
}
export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
  className?: string;
}
export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    designation: string;
    department: string;
    joiningDate: string;
    employmentType: string;
    salarySlip?: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    nationality: string;
    officeLocation: string;
    employeeId: string;
    slackId?: string;
    maritalStatus?: string;
    userName?: string;
    githubId?: string;
    workingDays?: string;
    skypeId?: string;
    appointmentLetter?: string;
    experienceLetter?: string;
    relivingLetter?: string;
    photoURL?: string;
    attendance?: string;
    status?: string;
    checkOut?: string;
    photoPublicId?: string;
  }
  