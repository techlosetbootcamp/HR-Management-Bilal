// pages/login.tsx
import type { NextPage } from 'next';
import Image from 'next/image'; // For optimized image loading
import Link from 'next/link';

const Register: NextPage = () => {
  return (
    <div className=" flex items-center justify-center h-screen">
      <div className=" p-8 rounded-lg shadow-md w-96">

        <div className="flex justify-center mb-6">
          {/* Use Next.js Image component for logo */}
          <Image src="/your-logo.png" alt="Logo" width={64} height={64} /> {/* Adjust width/height */}
        </div>

        <h2 className="text-4xl font-bold mb-4 text-center">HR SEARCH</h2>

        <p className="text-white mb-6 text-center">Welcome! Please Register here.</p>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-gray-400 font-medium mb-2">Name</label>
          <input 
            type="Name" 
            id="email" 
            name="Name" 
            className="w-full border border-orange-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name" 
            defaultValue="Name" // Use defaultValue in React
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 font-medium mb-2">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="w-full border border-orange-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="econev666@gmail.com" 
            defaultValue="econev666@gmail.com" // Use defaultValue in React
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-400 font-medium mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            className="w-full border border-orange-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          {/* <div className="flex items-center">
            <input type="checkbox" id="remember" name="remember" className="mr-2" />
            <label htmlFor="remember" className="text-white">Remember Me</label>
          </div> */}
          <div>
            <Link href="../auth//login" className="text-orange-500 hover:underline">Already Have Account Login</Link>
          </div>
        </div>

        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300">
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;