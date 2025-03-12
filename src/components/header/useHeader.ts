import { useEmployeeDetails } from '@/components/employeeDetails/useEmployeeDetails';
import { useSession } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [firstVisit, setFirstVisit] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (pathname !== '/') {
      setFirstVisit(false);
    }
  }, [pathname]);

  const params = useParams();
  const isEmployeePage = pathname.startsWith('/employees/') && params.id;
  const { employee } = useEmployeeDetails(isEmployeePage ? (params.id as string) : '');

  const formatPageName = (path: string) => {
    if (isEmployeePage && employee) {
      return `${employee.firstName} ${employee.lastName}`;
    }
    return path
      .replace('/', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()) || 'Dashboard';
  };

  const currentPage = formatPageName(pathname);
  const userName = session?.user?.name || 'User';

  return {
    currentPage,
    userName,
    firstVisit,
    searchTerm,
    setSearchTerm,
  };
}
