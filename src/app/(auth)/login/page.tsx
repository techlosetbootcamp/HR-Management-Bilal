import LoginForm from '@/component/loginForm/LoginForm'
import { iconLoginLogo } from '@/constants/images'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#131313]">
    <div className="w-[445px] h-[561px] gap-[40px] p-6">
      <Image
        src={iconLoginLogo}
        alt="Icon Logo"
        className="h-[166px] w-[409px]"
      />
      <div className="text-white font-semibold text-[30px]">Welcome</div>
      <div className="text-white font-light mb-5 text-[16px]">Please Register here</div>
      <LoginForm />
    </div>
  </div>
  )
}

export default page
