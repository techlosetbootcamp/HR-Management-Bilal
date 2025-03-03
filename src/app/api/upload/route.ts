// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "../../../../lib/cloudinary";
// import { Readable } from "stream";

// export const config = {
//   api: {
//     bodyParser: false, // Ensure API can handle streams properly
//     responseLimit: "10mb",
//   },
// };

// export async function POST(req: NextRequest) {
//   try {
//     console.log("Received file upload request...");

//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     const oldPublicId = formData.get("oldPublicId") as string | null;

//     if (!file) {
//       return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
//     }

//     console.log("Converting file to buffer...");
//     const buffer = Buffer.from(await file.arrayBuffer());

//     if (buffer.length === 0) {
//       throw new Error("File buffer is empty.");
//     }

//     // Delete old image if exists
//     if (oldPublicId) {
//       try {
//         await cloudinary.uploader.destroy(oldPublicId);
//         console.log(`Deleted old image: ${oldPublicId}`);
//       } catch (deleteError) {
//         console.error("Error deleting old image:", deleteError);
//       }
//     }

//     console.log("Uploading new image to Cloudinary...");

//     // Ensure Cloudinary configuration is loaded
//     console.log("Cloudinary config:", cloudinary.config());

//     // Convert Buffer to Stream and upload
//     const uploadResult = await new Promise((resolve, reject) => {
//       const stream = Readable.from(buffer);

//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: "employee_images", public_id: `employee_${Date.now()}` },
//         (error, result) => {
//           if (error) {
//             console.error("Cloudinary upload error:", error);
//             reject(error);
//           } else {
//             console.log("Cloudinary upload success:", result);
//             resolve(result);
//           }
//         }
//       );

//       // Ensure proper error handling
//       stream.on("error", (err) => {
//         console.error("Stream error:", err);
//         reject(err);
//       });

//       stream.pipe(uploadStream);
//     });

//     console.log("Upload successful:", uploadResult);
//     return NextResponse.json(uploadResult);
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("❌ No file received.");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("📂 File received:", file.name);

    // ✅ Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    // ✅ Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "employee_images" },
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
