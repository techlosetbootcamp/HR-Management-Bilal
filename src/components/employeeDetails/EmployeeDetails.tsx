import { useState } from "react";
import { useEmployeeDetails } from "@/hooks/useEmployeeDetails";
import {
  Briefcase,
  Download,
  Edit,
  Eye,
  FileText,
  Lock,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InputField from "../infoInput/InfoInput";
import {
  AccountAccess,
  PersonalInfo,
  ProfessionalInfo,
} from "@/utils/employeeFeilds";
import { Employee } from "@/types/types";

type InputFieldType =
  | "number"
  | "email"
  | "select"
  | "date"
  | "password"
  | "text"
  | undefined;

interface EmployeeDetailsProps {
  id: string;
  isEditMode: boolean;
  employeeEmail: string;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  id,
  isEditMode,
}) => {
  const {
    employee,
    loading,
    error,
    handleUpdate,
    saveChanges,
    updatedImage,
    updatedFields,
    handleImageChange,
  } = useEmployeeDetails(id);
  const [activeTab, setActiveTab] = useState("profile");
  const fields: Extract<keyof Employee, string>[] = [
    "appointmentLetter",
    "salarySlip",
    "experienceLetter",
    "relivingLetter",
  ];
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const openPdfPreview = (url: string) => {
    console.log("Opening PDF:", url);

    setPdfPreview(url);
  };

  const getPdfUrl = (url: string) => {
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
      url
    )}`;
  };

  const closePdfPreview = () => {
    setPdfPreview(null);
  };

  const [subTab, setSubTab] = useState("personal");
  const router = useRouter();
  if (loading) return <p className="text-white">Loading employee details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="dark:bg-[#131313] dark:text-white rounded-lg shadow-lg flex border border-gray-700">
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
            <div className="flex items-center gap-4 mb-6">
              <label
                htmlFor="profileImageUpload"
                className="cursor-pointer relative"
              >
                <Image
                  width={100}
                  height={100}
                  src={
                    updatedImage || employee?.photoURL || "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-[100px] h-[100px] object-cover rounded-full border border-gray-500"
                />

                {isEditMode && (
                  <div className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full">
                    <Edit size={16} />
                  </div>
                )}
              </label>

              {isEditMode && (
                <input
                  type="file"
                  id="profileImageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageChange(e.target.files[0]);
                    }
                  }}
                />
              )}

              <div>
                <h2 className="text-2xl font-bold">
                  {employee?.firstName} {employee?.lastName}
                </h2>
                <p className="text-orange-400">{employee?.designation}</p>
                <p>{employee?.email}</p>
              </div>

              <button
                onClick={() =>
                  router.push(`/employees/${employee?.id}?edit=true`)
                }
                className="ml-auto bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Edit /> Edit Profile
              </button>
            </div>
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
            {subTab === "personal" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PersonalInfo.map(
                    ({ name, label, valueKey, type, options }) => (
                      <InputField
                        key={name}
                        name={name}
                        label={label}
                        value={
                          updatedFields[name as keyof Employee]  ??
                          ((employee?.[valueKey as keyof Employee] as string) ||
                            "")
                        }
                        isEditMode={isEditMode}
                        type={type as InputFieldType}
                        options={options}
                        onChange={(e) => handleUpdate(name, e.target.value)}
                      />
                    )
                  )}
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
                  {ProfessionalInfo.map(({ name, label, type, options ,valueKey}) => (
                    <InputField
                      key={name}
                      name={name}
                      label={label}
                      type={type as "text" | "select"}
                      value={
                        updatedFields[name as keyof Employee]  ??
                        ((employee?.[valueKey as keyof Employee] as string) ||
                          "")
                      }
                      options={options}
                      isEditMode={isEditMode}
                      onChange={(e) => handleUpdate(name, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            {subTab === "documents" && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <div
                      key={field}
                      className="flex items-center gap-2 bg-[#131313] p-3 rounded-md border border-gray-700"
                    >
                      {employee && employee[field] ? (
                        <>
                          <span className="text-white flex-grow">
                            {field.replace(/([A-Z])/g, " $1")}.pdf
                          </span>

                          <button
                            onClick={() =>
                              openPdfPreview(employee[field] as string)
                            }
                            className="dark:text-white hover:underline"
                          >
                            <Eye />
                          </button>

                          <a
                            href={employee[field] as string}
                            download
                            className="dark:text-white hover:underline"
                          >
                            <Download />
                          </a>
                        </>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No {field} uploaded
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {pdfPreview && (
                  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
                      <iframe
                        src={getPdfUrl(pdfPreview)}
                        className="w-full h-[500px]"
                      ></iframe>
                      <button
                        onClick={closePdfPreview}
                        className="mt-2 text-red-500"
                      >
                        ✖ Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {subTab === "account" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Account Access</h3>
                <div className="grid grid-cols-2 gap-4">
                  {AccountAccess.map(({ name, label,valueKey  }) => (
                    <InputField
                      key={name}
                      name={name}
                      label={label}
                      value={
                        updatedFields[name as keyof Employee]  ??
                        ((employee?.[valueKey as keyof Employee] as string) ||
                          "")
                      }
                      isEditMode={isEditMode}
                      onChange={(e) => handleUpdate(name, e.target.value)}
                    />
                  ))}
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
