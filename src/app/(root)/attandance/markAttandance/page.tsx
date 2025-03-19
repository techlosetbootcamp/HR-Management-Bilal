'use client'
import { useAttendanceForm } from "./useAttandance";
import AllEmployee from "@/components/allEmployee/AllEmployee";
import AttendanceModalForm from "@/components/attandanceModal/AttandanceModal";
import SearchBar from "@/components/searchbar/Searchbar";

export default function AttendanceForm() {
  const {
    employees,
    selectedEmployee,
    setSelectedEmployee,
    date,
    setDate,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    breakTime,
    isAdmin,
    setBreakTime,
    status,
    setStatus,
    loading,
    showModal,
    setShowModal,
    manualWorkingHours,
    setManualWorkingHours,
    handleSubmit,
    resetForm,
    searchTerm,
    handleSearchChange,
  } = useAttendanceForm();

  return (
    <div className="border p-4 dark:border-gray-700 dark:bg-[#131313] dark:text-white rounded-[15px]">
      <h2 className="text-2xl font-semibold mb-4">Employee Attendance</h2>
      
      <div className="w-[300px]">
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      
      </div>
      <AllEmployee
        employees={employees}
        isAdmin={isAdmin}
        isAttendancePage={true}
        handleMarkAttendance={(employee) => {
          setSelectedEmployee({
            ...employee,
            officeLocation: employee.officeLocation || "",
          });
          setShowModal(true);
        }}
      />

      <AttendanceModalForm
        selectedEmployee={selectedEmployee}
        showModal={showModal}
        onClose={resetForm}
        onSubmit={handleSubmit}
        updateAttendanceState={(field, value) => {
          switch (field) {
            case "date":
              setDate(typeof value === "string" ? value : "");
              break;
            case "checkIn":
              setCheckIn(typeof value === "string" ? value : "");
              break;
            case "checkOut":
              setCheckOut(typeof value === "string" ? value : "");
              break;
            case "breakTime":
              setBreakTime(typeof value === "string" ? value : "");
              break;
            case "manualWorkingHours":
              setManualWorkingHours(typeof value === "string" ? value : "");
              break;
            case "status":
              if (typeof value === "string") {
                setStatus(value);
              }
              break;
            default:
              break;
          }
        }}
        attendanceState={{
          date,
          checkIn,
          checkOut,
          breakTime,
          manualWorkingHours,
          status,
          loading,
          selectedEmployee,
          showModal,
        }}
      />
    </div>
  );
}
