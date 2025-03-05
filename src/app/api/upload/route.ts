import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("❌ No file received.");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("📂 File received:", file.name, "Type:", file.type);

    // ✅ Determine file type
    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";

    if (!isImage && !isPDF) {
      return NextResponse.json({ error: "Only images and PDFs are allowed" }, { status: 400 });
    }

    // ✅ Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    // ✅ Define folder and resource type
    const folder = isImage ? "employee_images" : "employee_documents";
    const resourceType = isImage ? "image" : "raw"; // "raw" for PDFs

    // ✅ Upload to Cloudinary with the correct resource type
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType }, // Properly using resourceType
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.pipe(uploadStream);
    });

    console.log("✅ Cloudinary upload successful:", uploadResult);
    return NextResponse.json(uploadResult, { status: 200 });

  } catch (error) {
    console.error("❌ Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
