import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');
  
    try {
      const projects = employeeId
        ? await prisma.project.findMany({
            where: { assignedEmployeeId: employeeId },
          })
        : await prisma.project.findMany();
  
      console.log("Projects fetched:", projects);
      return NextResponse.json(projects);
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error in GET /api/projects:", err.message);
      return NextResponse.json(
        { message: 'Error fetching projects', error: err.message },
        { status: 500 }
      );
    }
  }

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, assignedEmployeeId, startDate, endDate } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        assignedEmployeeId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(project);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { message: "Error creating project", error: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const action = searchParams.get("action");

  if (action === "complete" && id) {
    try {
      const updatedProject = await prisma.project.update({
        where: { id },
        data: { status: "COMPLETED" },
      });
      return NextResponse.json(updatedProject);
    } catch (error: unknown) {
      const err = error as Error;
      return NextResponse.json(
        { message: "Error updating project", error: err.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: "Bad request: missing project id or invalid action" },
    { status: 400 }
  );
}
