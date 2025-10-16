import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: "dzdxloz04",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
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

    // Handle multiple images
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

    if (!name || !slug || !price || !description || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        discountPrice,
        inStock,
        images: imageUrls,
        heightOptions,
        potOptions,
        soilCoverOptions,
        variants,
        categoryId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}


// GET: fetch all products with category info
export async function GET() {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: {
            select: { name: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      return NextResponse.json(products);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  }