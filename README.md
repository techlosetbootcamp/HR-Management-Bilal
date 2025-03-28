This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 🧑‍💼 HR Management System

An advanced **HR Management System** built with [Next.js 15](https://nextjs.org), featuring **light and dark mode**, **admin and employee roles**, and **comprehensive employee management** capabilities.

## 🚀 Features

✅ **Employee Management**: Admins can add, update, delete, and view employees. Employees can view and update their own profiles.
✅ **Role-Based Access**:

* **Admin**: Full CRUD access (Create, Read, Update, Delete) and attendance management.
* **Employee**: Limited access to view personal information and update their details.
  ✅ **Dark/Light Mode**: Toggle between **light** and **dark** themes for better user experience.
  ✅ **Secure Authentication**: Powered by **NextAuth** and JWT for safe and reliable user authentication.
  ✅ **Profile Management**: Update profile pictures, names, and other details seamlessly.
  ✅ **Multi-Step Registration**: Smooth, guided employee registration with document uploads via **Cloudinary**.
  ✅ **Forgot Password**: OTP-based email verification for password recovery.

## 🛠️ Tech Stack

* **Frontend**: Next.js 15, TypeScript, Tailwind CSS
* **Backend**: Node.js, Express.js, Prisma ORM
* **Database**: MongoDB
* **Authentication**: NextAuth, JWT
* **Storage**: Cloudinary (for file uploads)
* **State Management**: Redux Toolkit

## 📦 Installation

1. Clone the repository:

```
 git clone https://github.com/your-repo/hr-management.git
 cd hr-management
```

2. Install dependencies:

```
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `<span>.env</span>` file in the root directory and add the following:

```
DATABASE_URL=your_mongo_db_url
NEXTAUTH_SECRET=your_nextauth_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

## 📊 Running the Application

Start the development server:

```
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Usage Guide

1. **Admin Dashboard**:
   * View, add, update, and delete employee records.
   * Manage attendance and track employee activity.
2. **Employee Dashboard**:
   * View and update personal information.
   * Access attendance records.
3. **Profile Management**:
   * Update profile picture and personal details.
4. **Forgot Password**:
   * Use OTP verification to reset your password securely.

## 🚀 Deployment

Easily deploy the app on [Vercel](https://vercel.com/new) for production.

```
npm run build
npm run start
```

## 📚 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Prisma Documentation]()
* [Redux Toolkit]()
* [Cloudinary]()

## 🤝 Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the **MIT License**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
