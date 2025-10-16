import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// 🧩 Cloudinary config
cloudinary.config({
  cloud_name: "dzdxloz04",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🗑️ DELETE Category + Image
export async function DELETE(req, context) {
  const { params } = await context;
  const { id } = params;

  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Delete Cloudinary image
    if (category.image) {
      const publicId = extractPublicId(category.image);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    // Delete from DB
    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

// 🟢 UPDATE Category (name, slug, image)
export async function POST(req, context) {
  const { params } = await context;
  const { id } = params;

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const image = formData.get("image");

    // 1️⃣ Fetch existing category
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    let updatedImage = category.image;

    // 2️⃣ If new image uploaded → delete old one and use new URL
    if (image && image !== category.image) {
      try {
        // Delete old image from Cloudinary
        if (category.image) {
          const publicId = extractPublicId(category.image);
          if (publicId) await cloudinary.uploader.destroy(publicId);
        }
        updatedImage = image; // new Cloudinary URL from frontend
      } catch (error) {
        console.error("⚠️ Error updating Cloudinary image:", error);
      }
    }

    // 3️⃣ Update category in DB
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        image: updatedImage,
      },
    });

    // 4️⃣ Return updated record
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// 🔹 Helper to extract Cloudinary public_id
function extractPublicId(url) {
  try {
    // Example: https://res.cloudinary.com/.../upload/v123456/greensouq/categories/abcd1234.jpg
    const regex = /upload\/(?:v\d+\/)?(.+?)\.\w+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
