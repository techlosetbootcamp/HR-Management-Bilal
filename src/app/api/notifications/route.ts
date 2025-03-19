import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email ?? "" },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, action } = await req.json();

    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing notification id or action" },
        { status: 400 }
      );
    }

    let result;
    switch (action) {
      case "read":
        result = await prisma.notification.update({
          where: { id },
          data: { isRead: true },
        });
        break;
      case "delete":
        result = await prisma.notification.delete({
          where: { id },
        });
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ notification: result }, { status: 200 });
  } catch (error) {
    console.error("Error handling notification action:", error);
    return NextResponse.json(
      { error: "Failed to handle notification action" },
      { status: 500 }
    );
  }
}
