import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import cloudinary from "../../../../lib/cloudinary";

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js default body parser for form data
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Parse form data
    const form = new IncomingForm({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: "File parsing error" });
      }

      const file = files.file as any;
      const filePath = file.filepath;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "employee_images",
        public_id: `employee_${Date.now()}`,
      });

      // Delete temporary file
      fs.unlinkSync(filePath);

      return res.status(200).json({
        url: result.secure_url,
        public_id: result.public_id,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
}
