// "use client";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { AppDispatch, RootState } from "@/redux/store";
// import { fetchEmployees, deleteEmployee } from "@/redux/slice/employeeSlice";
// import { Edit, Trash, Eye } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";

// export default function EmployeesPage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const { employees, loading, error } = useSelector(
//     (state: RootState) => state.employees
//   );
//   const { data: session } = useSession();
//   const isAdmin = session?.user?.role === "ADMIN";

//   useEffect(() => {
//     dispatch(fetchEmployees());
//   }, [dispatch]);

//   const handleDelete = (id: string) => {
//     if (confirm("Are you sure you want to delete this employee?")) {
//       dispatch(deleteEmployee(id));
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 dark:bg-[#131313] min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
//         Employee List
//       </h2>

//       {loading && (
//         <p className="text-gray-700 dark:text-gray-300">Loading employees...</p>
//       )}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Employee Table */}
//       <div className="w-full overflow-x-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg">
//         {/* Table Header */}
//         <div className="grid grid-cols-7 sm:grid-cols-8 font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg text-center">
//           <div className="p-2">Employee</div>
//           <div className="p-2 hidden sm:block">ID</div>
//           <div className="p-2">Department</div>
//           <div className="p-2">Designation</div>
//           <div className="p-2 hidden sm:block">Type</div>
//           <div className="p-2">Status</div>
//           {isAdmin && <div className="p-2 text-center col-span-2">Actions</div>}
//         </div>

//         {/* Employee Rows */}
//         {employees.map((emp, index) => (
//           <div
//             key={emp.id}
//             className={`grid grid-cols-7 sm:grid-cols-8 items-center text-gray-900 dark:text-white border-b text-center ${
//               index % 2 === 0
//                 ? "bg-gray-50 dark:bg-gray-700"
//                 : "bg-gray-100 dark:bg-gray-800"
//             } p-4`}
//           >
//             {/* Employee Image & Name */}
//             <div className="flex items-center gap-3">
//               <Image
//                 width={35}
//                 height={35}
//                 src={emp.photoURL || "/default-avatar.png"}
//                 alt={emp.firstName}
//                 className="w-9 h-9 rounded-full object-cover"
//               />
//               <span className="font-medium">
//                 {/* {emp.firstName}  */}
//                 {emp.lastName}
//               </span>
//             </div>

//             {/* Employee Details */}
//             <div className="hidden sm:block">{emp.employeeId}</div>
//             <div>{emp.department}</div>
//             <div>{emp.designation}</div>
//             <div className="hidden sm:block">{emp.employmentType}</div>

//             {/* Status Badge */}
//             <div className="p-2">
//               <span
//                 className={`px-3 py-1 rounded-md text-xs font-medium text-white ${
//                   emp.status === "Permanent" ? "bg-orange-600" : "bg-blue-600"
//                 }`}
//               >
//                 {emp.status}
//               </span>
//             </div>

//             {/* Action Buttons (Only Admins) */}
//             {isAdmin && (
//               <div className="flex justify-center gap-2">
//                 {/* View Button */}
//                 <button
//                   onClick={() => router.push(`/employees/${emp.id}`)}
//                   className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition duration-200"
//                 >
//                   <Eye size={18} />
//                 </button>

//                 {/* Edit Button */}
//                 <button
//                   onClick={() => router.push(`/employees/${emp.id}?edit=true`)}
//                   className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg transition duration-200"
//                 >
//                   <Edit size={18} />
//                 </button>

//                 {/* Delete Button */}
//                 <button
//                   onClick={() => handleDelete(emp.id)}
//                   className="bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg transition duration-200"
//                 >
//                   <Trash size={18} />
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteEmployee } from "@/redux/slice/employeeSlice";
import {  Trash, Eye, PencilLine } from "lucide-react";
import Image from "next/image";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  designation: string;
  employmentType: string;
  status?: string; // ✅ Allow undefined
  city?: string;
  photoURL?: string;
}

interface Props {
  employees: Employee[];
  isAdmin: boolean;
}

export default function AllEmployee({ employees, isAdmin }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="dark:bg-[#131313] dark:text-white rounded-b-lg">
      {employees.length > 0 ? (
        employees.map((emp) => (
          <div
            key={emp.id}
            className="grid grid-cols-7 gap-4 border-b border-gray-700 p-3"
          >
            {/* Employee Name & Image */}
            <div className="flex items-center gap-2">
              <Image
                width={30}
                height={30}
                src={emp.photoURL || "/default-avatar.png"}
                alt={emp.firstName}
                className="w-8 h-8 rounded-full"
              />
              <span>
                {emp.firstName} {emp.lastName}
              </span>
            </div>

            {/* Employee Details */}
            <div>{emp.employeeId}</div>
            <div>{emp.department}</div>
            <div>{emp.designation}</div>
            <div>{emp.employmentType}</div>

            {/* Employee Status */}
            <div>
              <span
                className={`px-3 py-1 rounded-md text-xs ${
                  emp.status === "Permanent" ? "text-customOrange" : "bg-blue-600"
                }`}
              >
                {emp.status}
              </span>
            </div>

            {isAdmin ? (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => router.push(`/employees/${emp.id}`)}
                  className="dark:text-white p-2 rounded hover:text-blue-500"
                >
                  <Eye size={24} />
                </button>
                <button
                  onClick={() => router.push(`/employees/${emp.id}?edit=true`)}
                  className="dark:text-white p-2 rounded hover:text-green-600"
                >
                  <PencilLine  size={24}/>
                </button>
                <button
                  onClick={() => dispatch(deleteEmployee(emp.id))}
                  className="dark:text-white p-2 rounded hover:text-customOrange font-extrabold"
                >
                  <Trash size={24} />
                </button>
              </div>
            ) : (
              <div>{emp.city || "N/A"}</div>
            )}
          </div>
        ))
      ) : (
        <p className="text-white text-center p-4">No employees found.</p>
      )}
    </div>
  );
}
