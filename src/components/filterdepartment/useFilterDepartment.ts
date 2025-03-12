import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useFilterDepartment() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleEmployeeClick = (id: string) => {
    if (session?.user.role === "ADMIN") {
      router.push(`/employees/${id}`);
    } else {
      alert("You don't have permission to view employee details");
    }
  };

  return { handleEmployeeClick };
}