// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../.././../../../lib/prisma";
// import bcrypt from "bcrypt";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../../lib/auth";

// export async function PUT(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     const { oldPassword, newPassword, email: otpEmail } = await req.json();

//     const email: string | undefined = session?.user?.email ?? otpEmail ?? undefined;

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // If user is authenticated, they must enter old password
//     if (session?.user?.email) {
//       if (!oldPassword) {
//         return NextResponse.json({ error: "Old password is required" }, { status: 400 });
//       }

//       const passwordMatch = await bcrypt.compare(oldPassword, user.Password);
//       if (!passwordMatch) {
//         return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
//       }
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user password
//     await prisma.user.update({
//       where: { email },
//       data: { Password: hashedPassword },
//     });

//     return NextResponse.json({ message: "Password changed successfully" });
//   } catch (error) {
//     console.error("Error updating password:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions); // ✅ Get user session
    const { email, newPassword } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { Password: hashedPassword },
    });

    // ✅ Preserve session: Update the session instead of logging out
    if (session) {
      // Update session user data if necessary (excluding password)
      session.user = { ...session.user };
    }

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
