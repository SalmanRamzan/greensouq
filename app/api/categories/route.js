import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// 🧩 Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ===============================
// 🟢 CREATE new category (POST)
// ===============================
export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const imageFile = formData.get("image");

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    let imageUrl = null;

    // If image is provided, upload to Cloudinary
    if (imageFile && imageFile instanceof File) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "greensouq/categories" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }).end(buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    const category = await prisma.category.create({
      data: { name, slug, image: imageUrl },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST /categories error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}


// ===============================
// 🟣 GET all categories
// ===============================
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET /categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}


// ===============================
// 🔴 DELETE category (DELETE)
// ===============================
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Category ID required" }, { status: 400 });
    }

    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /categories error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
