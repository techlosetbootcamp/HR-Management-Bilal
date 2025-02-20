import React from 'react'
import DashboardLayout from './(root)/layout'
import Dashboard from '@/components/dashboard/Dashboard'
import DefaultLayout from '@/components/defaultLayout/DefaultLayout'
function page() {
  return (
    <DefaultLayout>
      <DashboardLayout>
        <Dashboard/>
      </DashboardLayout>
      </DefaultLayout>
  )
}

export default page
