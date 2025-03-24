// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../lib/prisma";
// import bcrypt from "bcrypt";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../lib/auth";

// export async function PUT(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     const { email, newPassword } = await req.json();

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await prisma.user.update({
//       where: { email },
//       data: { Password: hashedPassword },
//     });

//     if (session) {
//       session.user = { ...session.user };
//     }
//     await prisma.notification.create({
//       data: {
//         userId: user.id,
//         message: "Your password has been changed successfully.",
//       },
//     });
//     return NextResponse.json({ message: "Password reset successfully" });
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
