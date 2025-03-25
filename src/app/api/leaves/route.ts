import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../..//lib/auth";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { startDate, endDate, reason } = await req.json();

    const employee = await prisma.employee.findUnique({
      where: { email: session.user.email ?? "" },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee record not found" },
        { status: 404 }
      );
    }

    const leave = await prisma.leave.create({
      data: {
        employeeId: employee.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
      },
    });

    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
    });

    const adminNotifications = admins?.map((admin) => ({
      userId: admin.id,
      message: `New leave request from ${session.user.name}`,
    }));

    await prisma.notification.createMany({
      data: adminNotifications,
    });

    console.log("Admin notifications created:", adminNotifications);

    const employeeUser = await prisma.user.findUnique({
      where: { email: session.user.email ?? "" },
    });

    if (!employeeUser) {
      return NextResponse.json(
        { error: "Employee user record not found" },
        { status: 404 }
      );
    }

    const employeeNotification = {
      userId: employeeUser.id,
      message: `Your leave request from ${startDate} to ${endDate} has been submitted.`,
    };

    await prisma.notification.create({
      data: employeeNotification,
    });

    console.log("Employee notification created:", employeeNotification);

    return NextResponse.json(
      { leave, message: "Leave request submitted" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating leave:", error);
    return NextResponse.json(
      { error: "Failed to request leave" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    if (session) {
      const leaves = await prisma.leave.findMany({
        include: { employee: true },
      });

      return NextResponse.json({ leaves }, { status: 200 });
    }

    const leaves = await prisma.leave.findMany({
      where: { employeeId: session },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leaves }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leave status:", error);
    return NextResponse.json(
      { error: "Failed to fetch leave status" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { leaveId, status } = await req.json();
    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const leave = await prisma.leave.update({
      where: { id: leaveId },
      data: { status },
      include: { employee: true },
    });

    if (status === "APPROVED") {
      const employeeUser = await prisma.user.findUnique({
        where: { email: leave.employee.email },
      });

      if (!employeeUser) {
        console.error("Employee user record not found!");
      } else {
        await prisma.notification.create({
          data: {
            userId: employeeUser.id,
            message: `Your leave request from ${new Date(
              leave.startDate
            ).toDateString()} to ${new Date(
              leave.endDate
            ).toDateString()} has been approved successfully.`,
          },
        });
        console.log("Notification sent to employee:", employeeUser.id);
      }
    } else if (status === "REJECTED") {
      const employeeUser = await prisma.user.findUnique({
        where: { email: leave.employee.email },
      });

      if (!employeeUser) {
        console.error("Employee user record not found!");
      } else {
        await prisma.notification.create({
          data: {
            userId: employeeUser.id,
            message: `Your leave request from ${new Date(
              leave.startDate
            ).toDateString()} to ${new Date(
              leave.endDate
            ).toDateString()} has been rejected.`,
          },
        });
        console.log(
          "Notification sent to employee for rejection:",
          employeeUser.id
        );
      }
    }

    return NextResponse.json(
      { leave, message: `Leave ${status.toLowerCase()}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating leave status:", error);
    return NextResponse.json(
      { error: "Failed to update leave status" },
      { status: 500 }
    );
  }
}
