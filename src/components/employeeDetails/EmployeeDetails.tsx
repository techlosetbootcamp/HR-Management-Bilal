import { useState, useEffect } from "react";
import { useEmployeeDetails } from "@/components/employeeDetails/useEmployeeDetails";
import {
  BriefcaseBusiness,
  Download,
  Edit,
  Eye,
  Mail,
  Save,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  AccountAccess,
  PersonalInfo,
  ProfessionalInfo,
} from "@/utils/employeeFeilds";
import { Employee } from "@/types/types";
import LottieAnimation from "../lottieAnimation/LottieAnimation";
import TabBar from "../tabBar/TabBar";
import { mainTabs, subTabs } from "@/utils/tabConfigs";
import EmployeeInput from "../employeeInput/EmployeeInput";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(searchParams.get("edit") === "true");
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "—";
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Optional: Use 12-hour format
    });
  };

  const handleEditSaveClick = async () => {
    if (isEditing) {
      await saveChanges();
      setIsEditing(false);
      router.push(`/employees/${employee?.id}`);
    } else {
      setIsEditing(true);
      router.push(`/employees/${employee?.id}?edit=true`);
    }
  };
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
  interface Attendance {
    id: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
    breakTime: string;
    workingHours: string;
    employeeId: string;
  }

  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(`/api/attendance?employeeId=${id}`);
        if (!res.ok) throw new Error("Failed to fetch attendance data");
        const data = await res.json();
        setAttendanceRecords(data.filter((record: Attendance) => record.employeeId === id));
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    if (id) fetchAttendance();
  }, [id]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-[#131313]">
        <LottieAnimation />
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="dark:bg-[#131313] dark:text-white rounded-lg shadow-lg flex flex-col md:flex-row border border-gray-700">
      <div className="w-full md:w-1/4 h-auto md:h-[700px] dark:bg-[#A2A1A80D] bg-gray-300 text-black p-4">
        <TabBar
          tabs={mainTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          orientation="vertical"
          activeClassName="bg-customOrange text-white"
          inactiveClassName="dark:text-white"
        />
      </div>

      <div className="w-full md:w-3/4 p-4">
        {activeTab === "profile" && (
          <>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
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
                  className="w-[100px] h-[100px] object-cover rounded-lg border border-gray-500"
                />

                {isEditMode && (
                  <div className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-lg">
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

              <div className="flex flex-col text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold">
                  {employee?.firstName} {employee?.lastName}
                </h2>
                <p className="text-orange-400 flex my-2 text-sm md:text-base">
                  <BriefcaseBusiness className="text-white mr-2" />{" "}
                  {employee?.designation}
                </p>
                <p className="flex text-sm md:text-base">
                  <Mail className="mr-2" /> {employee?.email}
                </p>
              </div>

              <button
                onClick={handleEditSaveClick}
                className="mt-4 md:mt-0 ml-auto bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <Save size={16} /> Save
                  </>
                ) : (
                  <>
                    <Edit size={16} /> Edit Profile
                  </>
                )}
              </button>
            </div>

            <TabBar
              tabs={subTabs}
              activeTab={subTab}
              onTabChange={setSubTab}
              orientation="horizontal"
              activeClassName="text-orange-500 border-b-2 border-orange-500"
              inactiveClassName="dark:text-white"
            />

            {subTab === "personal" && (
              <div className="mb-6 mt-5">
                <h3 className="text-lg font-semibold mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PersonalInfo.map(
                    ({
                      name,
                      label,
                      valueKey,
                      type,
                      options,
                      disable,
                      className,
                    }) => (
                      <EmployeeInput
                        key={name}
                        name={name}
                        label={label}
                        value={
                          updatedFields[name as keyof Employee] ??
                          ((employee?.[valueKey as keyof Employee] as string) ||
                            "")
                        }
                        isEditMode={isEditMode}
                        type={type as InputFieldType}
                        disabled={disable}
                        options={options}
                        className={className}
                        onChange={(e) => handleUpdate(name, e.target.value)}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {subTab === "professional" && (
              <div className="mb-6 mt-5">
                <h3 className="text-lg font-semibold mb-2">
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ProfessionalInfo.map(
                    ({ name, label, type, options, valueKey }) => (
                      <EmployeeInput
                        key={name}
                        name={name}
                        label={label}
                        type={type as "text" | "select"}
                        value={
                          updatedFields[name as keyof Employee] ??
                          ((employee?.[valueKey as keyof Employee] as string) ||
                            "")
                        }
                        options={options}
                        isEditMode={isEditMode}
                        onChange={(e) => handleUpdate(name, e.target.value)}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {subTab === "documents" && (
              <div className="mb-6 mt-5">
                <h3 className="text-lg font-semibold mb-2">Documents</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="mb-6 mt-5">
                <h3 className="text-lg font-semibold mb-2">Account Access</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {AccountAccess.map(({ name, label, valueKey }) => (
                    <EmployeeInput
                      key={name}
                      name={name}
                      label={label}
                      value={
                        updatedFields[name as keyof Employee] ??
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
            <h3 className="text-lg font-semibold mb-4">Attendance Records</h3>

            {attendanceRecords.length > 0 ? (
              <table className="w-full border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-600 p-2">Date</th>
                    <th className="border border-gray-600 p-2">Check-In</th>
                    <th className="border border-gray-600 p-2">Check-Out</th>
                    <th className="border border-gray-600 p-2">Break Time</th>
                    <th className="border border-gray-600 p-2">Working Hours</th>

                    <th className="border border-gray-600 p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="border border-gray-600 p-2">{formatDate(record.date)}</td>
                      <td className="border border-gray-600 p-2">{formatTime(record.checkIn)}</td>
                      <td className="border border-gray-600 p-2">{formatTime(record.checkOut)}</td>
                      <td className="border border-gray-600 p-2">{record.breakTime}</td>
                      <td className="border border-gray-600 p-2">{record.workingHours}</td>

                      <td
                        className={`border border-gray-600 p-2 ${
                          record.status === "Present" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {record.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No attendance records found for this employee.</p>
            )}
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
