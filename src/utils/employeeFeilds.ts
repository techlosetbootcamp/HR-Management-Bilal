export const PersonalInfo = [
  { name: "firstName", label: "First Name", valueKey: "firstName" },
  { name: "lastName", label: "Last Name", valueKey: "lastName" },
  { name: "mobileNumber", label: "Mobile Number", valueKey: "mobileNumber" },
  { name: "email", label: "Email Address", valueKey: "email" },
  { name: "dateOfBirth", label: "Date of Birth", valueKey: "dateOfBirth" },
  {
    name: "maritalStatus",
    label: "Marital Status",
    valueKey: "maritalStatus",
    type: "select",
    options: ["Single", "Married"],
  },
  {
    name: "gender",
    label: "Gender",
    valueKey: "gender",
    type: "select",
    options: ["Male", "Female"],
  },
  {
    name: "nationality",
    label: "Nationality",
    valueKey: "nationality",
    type: "select",
    options: ["Pakistan", "Foreign"],
  },
  { name: "address", label: "Address", valueKey: "address" },
  {
    name: "city",
    label: "City",
    valueKey: "city",
    type: "select",
    options: [
      "Faisalabad",
      "Lahore",
      "Rawalpindi",
      "Islamabad",
      "Karachi",
      "Multan",
    ],
  },
  {
    name: "state",
    label: "State",
    valueKey: "state",
    type: "select",
    options: ["Punjab", "Sindh", "Balochistan", "KPK"],
  },
  { name: "zipCode", label: "Zip Code", valueKey: "zipCode" },
];

export const ProfessionalInfo = [
  { name: "employeeId", label: "Employee ID", type: "text" , valueKey: "employeeId"},
  { name: "userName", label: "User Name", type: "text", valueKey: "userName" },
  {
    name: "employmentType",
    label: "Employee Type",
    type: "select",
    options: ["Office", "Remote"],
    valueKey: "employmentType" 
  },
  { name: "email", label: "Email Address", type: "text", valueKey: "email" },
  {
    name: "status",
    label: "Employee Status",
    type: "select",
    options: ["Permanent", "Contract"],
    valueKey: "status"
  },
  {
    name: "department",
    label: "Department",
    type: "select",
    options: ["Design", "Development", "HR", "Sales"],
    valueKey: "department"  
  },
  {
    name: "designation",
    label: "Designation",
    type: "select",
    options: [
      "UI/UX Designer",
      "PHP Developer",
      "HR Executive",
      "HR Cordinator",
      "HR Assistant",
      "Sales Manager",
      "BDM",
      "Sales Engineer",
      "Dirextor of Sales",
      "Next.js Developer",
      "Node.js Developer",
      "Design Lead",
    ],
    valueKey: "designation"
  },
  {
    name: "workingDays",
    label: "Working Days",
    type: "select",
    options: ["Monday-Friday", "Sunday-Thursday", "Flexible"],
    valueKey: "workingDays"
  },
  { name: "joiningDate", label: "Joining Date", type: "text" , valueKey: "joiningDate"},
  {
    name: "officeLocation",
    label: "Office Location",
    type: "select",
    options: [
      "Faisalabad",
      "Lahore",
      "Islamabad",
      "Karachi",
      "Rawalpindi",
      "Multan",
    ],
    valueKey: "officeLocation"
  },
];

export const AccountAccess = [
  { name: "email", label: "Email Address" , valueKey: "email"},
  { name: "slackId", label: "Slack ID" , valueKey: "slackId"},
  { name: "skypeId", label: "Skype ID", valueKey: "skypeId" },
  { name: "githubId", label: "Github ID", valueKey: "githubId" },
];
