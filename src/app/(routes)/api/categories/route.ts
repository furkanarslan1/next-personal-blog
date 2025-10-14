import { prisma } from "@lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

//for get
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("category get method failed", error);
    return NextResponse.json({ message: "something went wrong" });
  }
}

//for add new category

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { message: "need a category name" },
        { status: 400 }
      );
    }

    // for slug create
    const generateSlug = slugify(name, {
      lower: true,
      strict: true,
      locale: "tr",
    });

    // do control is uniqe in database ?

    const existingCategory = await prisma.category.findFirst({
      where: { OR: [{ name }, { slug: generateSlug }] },
    });

    if (existingCategory) {
      const field = existingCategory.name === name ? "name" : "slug";
      return NextResponse.json({
        message: `This category:${field} already exists`,
      });
    }

    //create new category

    const newCategory = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: generateSlug,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.log("category didn' add", error);
    return NextResponse.json(
      {
        message: "An error occurred while adding the category.",
      },
      { status: 500 }
    );
  }
}
