// "use client";

// import { useEmployeeDetails } from "@/hooks/useEmployeeDetails";
// import EditableInput from "../editableInput/EditableInput";
// import { useState } from "react";
// import EditableSelect from "../editableSelect/EditableSelect";

// interface EmployeeDetailsProps {
//   id: string;
//   isEditMode: boolean;
// }

// const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
//   id,
//   isEditMode,
// }) => {
//   const { employee, loading, error, handleUpdate, saveChanges } =
//     useEmployeeDetails(id);
//   const [activeTab, setActiveTab] = useState("personal");

//   if (loading) return <p className="text-white">Loading employee details...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6 bg-gray-900 text-white rounded-lg max-w-3xl mx-auto shadow-lg">
//       <h2 className="text-xl font-bold mb-4">
//         {isEditMode ? "Edit Employee" : "Employee Details"}
//       </h2>

//       {employee && (
//         <>
//           <div className="flex justify-center mb-4">
//             <img
//               src={employee.photoURL || "/default-avatar.png"}
//               alt="Profile"
//               className="w-20 h-20 rounded-full"
//             />
//           </div>

//           {/* Tab Navigation */}
//           <div className="flex justify-around mb-6 border-b border-gray-700">
//             <button
//               className={`px-4 py-2 ${
//                 activeTab === "personal"
//                   ? "text-orange-500 border-b-2 border-orange-500"
//                   : ""
//               }`}
//               onClick={() => setActiveTab("personal")}
//             >
//               Personal Information
//             </button>
//             <button
//               className={`px-4 py-2 ${
//                 activeTab === "professional"
//                   ? "text-orange-500 border-b-2 border-orange-500"
//                   : ""
//               }`}
//               onClick={() => setActiveTab("professional")}
//             >
//               Professional Information
//             </button>
//             <button
//               className={`px-4 py-2 ${
//                 activeTab === "documents"
//                   ? "text-orange-500 border-b-2 border-orange-500"
//                   : ""
//               }`}
//               onClick={() => setActiveTab("documents")}
//             >
//               Documents
//             </button>
//             <button
//               className={`px-4 py-2 ${
//                 activeTab === "account"
//                   ? "text-orange-500 border-b-2 border-orange-500"
//                   : ""
//               }`}
//               onClick={() => setActiveTab("account")}
//             >
//               Account Access
//             </button>
//           </div>

//           {/* Tab Content */}
//           {activeTab === "personal" && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">
//                 Personal Information
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <EditableInput
//                   label="First Name"
//                   value={employee.firstName}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("firstName", value)}
//                 />
//                 <EditableInput
//                   label="Last Name"
//                   value={employee.lastName}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("lastName", value)}
//                 />
//                 <EditableInput
//                   label="Mobile Number"
//                   value={employee.mobileNumber}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("email", value)}
//                 />
//                 <EditableInput
//                   label="Email Address"
//                   value={employee.email}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("email", value)}
//                 />

//                 <EditableInput
//                   label="Date of Birth"
//                   value={employee.dateOfBirth}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("dateOfBirth", value)}
//                 />
//                 <EditableSelect
//                   label="Marital Status"
//                   value={employee.maritalStatus || ""}
//                   options={["Single", "Married"]}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("maritalStatus", value)}
//                 />
//                 <EditableSelect
//                   label="Gender"
//                   value={employee.maritalStatus || ""}
//                   options={["Male", "Female"]}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("gender", value)}
//                 />
//                 <EditableInput
//                   label="Nationality"
//                   value={employee.nationality}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("nationality", value)}
//                 />
//                 <EditableInput
//                   label="Address"
//                   value={employee.address}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("address", value)}
//                 />
//                 <EditableInput
//                   label="City"
//                   value={employee.city}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("city", value)}
//                 />
//                 <EditableInput
//                   label="State"
//                   value={employee.state}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("state", value)}
//                 />
//                 <EditableInput
//                   label="Zip Code"
//                   value={employee.zipCode}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("zipCode", value)}
//                 />
//               </div>
//               <button onClick={saveChanges}>Submit</button>
//             </div>
//           )}

//           {activeTab === "professional" && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">
//                 Professional Information
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <EditableInput
//                   label="Employee ID"
//                   value={employee.employeeId}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("employeeId", value)}
//                 />
//                 <EditableInput
//                   label="User Name"
//                   value={employee.userName}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("userName", value)}
//                 />
//                 <EditableSelect
//                   label="Employee Type"
//                   value={employee.employmentType || ""}
//                   options={["Office", "Remote"]}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("employmentType", value)}
//                 />
//                 <EditableInput
//                   label="Email Address"
//                   value={employee.email}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("email", value)}
//                 />
//                 <EditableSelect
//                   label="Department"
//                   value={employee.department || ""}
//                   options={[
//                     "Full Stack Developer",
//                     "UI/X Design",
//                     "HR Manager",
//                     "Project Manager",
//                     "Python Developer",
//                     "Node Developer",
//                   ]}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("department", value)}
//                 />
//                 <EditableInput
//                   label="Designation"
//                   value={employee.designation}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("designation", value)}
//                 />
//                 <EditableSelect
//                   label="Working Days"
//                   value={employee.workingDays || ""}
//                   options={["Monday-Friday", "Sunday-Thursday", "Flexible"]}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("workingDays", value)}
//                 />
//                 <EditableInput
//                   label="Joining Date"
//                   value={employee.joiningDate}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("joiningDate", value)}
//                 />
//                 <EditableInput
//                   label="Office Location"
//                   value={employee.officeLocation}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("officeLocation", value)}
//                 />
//               </div>
//             </div>
//           )}

//           {activeTab === "documents" && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">Documents</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {/* Add fields related to documents here */}
//               </div>
//             </div>
//           )}

//           {activeTab === "account" && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">Account Access</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <EditableInput
//                   label="Email Address"
//                   value={employee.email}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("email", value)}
//                 />
//                 <EditableInput
//                   label="Slack ID"
//                   value={employee.slackId}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("slackId", value)}
//                 />
//                 <EditableInput
//                   label="Skype ID"
//                   value={employee.skypeId}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("skypeId", value)}
//                 />
//                 <EditableInput
//                   label="Github ID"
//                   value={employee.githubId}
//                   isEditMode={isEditMode}
//                   onChange={(value) => handleUpdate("githubId", value)}
//                 />
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default EmployeeDetails;
import { useState } from "react";
import { useEmployeeDetails } from "@/hooks/useEmployeeDetails";
import { Briefcase, Edit, FileText, Lock, User } from "lucide-react";
import EditableInput from "../editableInput/EditableInput";
import EditableSelect from "../editableSelect/EditableSelect";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface EmployeeDetailsProps {
  id: string;
  isEditMode: boolean;
}
const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  id,
  isEditMode,
}) => {
  const { employee, loading, error, handleUpdate, saveChanges } =
    useEmployeeDetails(id);
  const [activeTab, setActiveTab] = useState("profile");
  const [subTab, setSubTab] = useState("personal");
  const router = useRouter();
  if (loading) return <p className="text-white">Loading employee details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" dark:bg-[#131313] dark:text-white rounded-lg shadow-lg flex border border-gray-700">
      {/* Sidebar Navigation */}
      <div className="w-1/4 h-[700px] dark:bg-[#A2A1A80D] bg-gray-300 text-black p-4">
        {["profile", "attendance", "projects", "leave"].map((tab) => (
          <button
            key={tab}
            className={`block w-full text-left px-4 py-3 mb-2 rounded-lg  ${
              activeTab === tab ? "bg-customOrange" : "dark:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="w-3/4 p-4">
        {activeTab === "profile" && (
          <>
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <Image
              width={100}
              height={50}
                src={employee?.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-[100px] h-[100px] object-cover "
              />
              <div>
                <h2 className="text-2xl font-bold">
                  {employee?.firstName} {employee?.lastName}
                </h2>
                <p className="text-orange-400">{employee?.designation}</p>
                <p>{employee?.email}</p>
              </div>
              <button
                onClick={() =>
                  router.push(`/employees/${employee.id}?edit=true`)
                }
                className="ml-auto bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Edit /> Edit Profile
              </button>
            </div>

            {/* Sub Tab Navigation */}
            <div className="flex border-b border-gray-700 mb-4">
              {[
                { key: "personal", label: "Personal", icon: <User /> },
                {
                  key: "professional",
                  label: "Professional",
                  icon: <Briefcase />,
                },
                { key: "documents", label: "Documents", icon: <FileText /> },
                { key: "account", label: "Account", icon: <Lock /> },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  className={`px-4 py-2 flex items-center gap-2 ${
                    subTab === key
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "dark:text-white"
                  }`}
                  onClick={() => setSubTab(key)}
                >
                  {icon} {label} Info
                </button>
              ))}
            </div>

            {/* Content Display */}
            {subTab === "personal" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <EditableInput
                    label="First Name"
                    value={employee.firstName}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("firstName", value)}
                  />
                  <EditableInput
                    label="Last Name"
                    value={employee.lastName}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("lastName", value)}
                  />
                  <EditableInput
                    label="Mobile Number"
                    value={employee.mobileNumber}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("email", value)}
                  />
                  <EditableInput
                    label="Email Address"
                    value={employee.email}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("email", value)}
                  />

                  <EditableInput
                    label="Date of Birth"
                    value={employee.dateOfBirth}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("dateOfBirth", value)}
                  />
                  <EditableSelect
                    label="Marital Status"
                    value={employee.maritalStatus || ""}
                    options={["Single", "Married"]}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("maritalStatus", value)}
                  />
                  <EditableSelect
                    label="Gender"
                    value={employee.maritalStatus || ""}
                    options={["Male", "Female"]}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("gender", value)}
                  />
                  <EditableInput
                    label="Nationality"
                    value={employee.nationality}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("nationality", value)}
                  />
                  <EditableInput
                    label="Address"
                    value={employee.address}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("address", value)}
                  />
                  <EditableInput
                    label="City"
                    value={employee.city}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("city", value)}
                  />
                  <EditableInput
                    label="State"
                    value={employee.state}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("state", value)}
                  />
                  <EditableInput
                    label="Zip Code"
                    value={employee.zipCode}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("zipCode", value)}
                  />
                </div>
                <button onClick={saveChanges}>Submit</button>
              </div>
            )}

            {subTab === "professional" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Professional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <EditableInput
                    label="Employee ID"
                    value={employee.employeeId}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("employeeId", value)}
                  />
                  <EditableInput
                    label="User Name"
                    value={employee.userName}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("userName", value)}
                  />
                  <EditableSelect
                    label="Employee Type"
                    value={employee.employmentType || ""}
                    options={["Office", "Remote"]}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("employmentType", value)}
                  />
                  <EditableInput
                    label="Email Address"
                    value={employee.email}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("email", value)}
                  />
                  <EditableSelect
                    label="Department"
                    value={employee.department || ""}
                    options={[
                      "Full Stack Developer",
                      "UI/X Design",
                      "HR Manager",
                      "Project Manager",
                      "Python Developer",
                      "Node Developer",
                    ]}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("department", value)}
                  />
                  <EditableInput
                    label="Designation"
                    value={employee.designation}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("designation", value)}
                  />
                  <EditableSelect
                    label="Working Days"
                    value={employee.workingDays || ""}
                    options={["Monday-Friday", "Sunday-Thursday", "Flexible"]}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("workingDays", value)}
                  />
                  <EditableInput
                    label="Joining Date"
                    value={employee.joiningDate}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("joiningDate", value)}
                  />
                  <EditableInput
                    label="Office Location"
                    value={employee.officeLocation}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("officeLocation", value)}
                  />
                </div>
              </div>
            )}
            {subTab === "documents" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Documents</h3>
                <p>No documents available.</p>
              </div>
            )}
            {subTab === "account" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Account Access</h3>
                <div className="grid grid-cols-2 gap-4">
                  <EditableInput
                    label="Email Address"
                    value={employee.email}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("email", value)}
                  />
                  <EditableInput
                    label="Slack ID"
                    value={employee.slackId}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("slackId", value)}
                  />
                  <EditableInput
                    label="Skype ID"
                    value={employee.skypeId}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("skypeId", value)}
                  />
                  <EditableInput
                    label="Github ID"
                    value={employee.githubId}
                    isEditMode={isEditMode}
                    onChange={(value) => handleUpdate("githubId", value)}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "attendance" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Attendance</h3>
            <p>Attendance details will be shown here.</p>
          </div>
        )}
        {activeTab === "projects" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            <p>Project details will be shown here.</p>
          </div>
        )}
        {activeTab === "leave" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Leave</h3>
            <p>Leave details will be shown here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
