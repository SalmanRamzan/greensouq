import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dzdxloz04",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// ✅ GET product by ID or Slug
export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Try to find by ID first
    let product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    // If not found by ID, try to find by slug
    if (!product) {
      product = await prisma.product.findUnique({
        where: { slug: id },
        include: { category: true },
      });
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Get product error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}



// DELETE product
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

// PATCH (update) product
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();

    const name = formData.get("name");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const discountPrice = parseFloat(formData.get("discountPrice")) || null;
    const categoryId = formData.get("categoryId");
    const inStock = formData.get("inStock") === "true";
    const heightOptions = formData.get("heightOptions")?.split(",") || [];
    const potOptions = formData.get("potOptions")?.split(",") || [];
    const soilCoverOptions = formData.get("soilCoverOptions")?.split(",") || [];
    const variants = formData.get("variants") ? JSON.parse(formData.get("variants")) : null;

    // Handle new uploaded images
    const images = formData.getAll("images");
    const imageUrls = [];
    for (const image of images) {
      if (typeof image === "object") {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const upload = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "greensouq/products" },
            (error, result) => (error ? reject(error) : resolve(result))
          );
          stream.end(buffer);
        });
        imageUrls.push(upload.secure_url);
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price,
        discountPrice,
        inStock,
        categoryId,
        heightOptions,
        potOptions,
        soilCoverOptions,
        variants,
        images: imageUrls.length > 0 ? imageUrls : undefined, // update only if new images uploaded
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("❌ Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
