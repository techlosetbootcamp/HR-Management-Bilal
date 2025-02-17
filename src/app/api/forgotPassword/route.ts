// import  prisma  from "../../../../lib/prisma";
// import bcrypt from "bcrypt";
// import { NextRequest, NextResponse } from "next/server";

// export const PUT = async (request: NextRequest) => {
//   try {
//     const { email, hashedPassword }: { email: string; hashedPassword: string } =
//       await request.json();

//     const userLogin = await prisma.user.findUnique({
//       where: { email: email },
//     });

//     if (!userLogin) {
//       return new NextResponse(JSON.stringify({ error: "User not found" }), {
//         status: 400,
//       });
//     }

//     const newPassword = await bcrypt.hash(hashedPassword, 12);

//     const user = await prisma.user.update({
//       where: { email: email },
//       data: {
//         Password: newPassword,
//       },
//     });

//     return new NextResponse(JSON.stringify({ data: user, success: true }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// };
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();

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

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
