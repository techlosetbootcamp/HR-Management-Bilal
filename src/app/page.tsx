import React from "react";
import ProtectedRootLayout from "./(root)/layout";
import Dashboard from "@/components/dashboard/Dashboard";
function page() {
  return (
    <ProtectedRootLayout>
      <Dashboard />
    </ProtectedRootLayout>
  );
}

export default page;
