import { prisma } from "@lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

interface Params {
  params: { id: string }; //for cat id
}

//********************************* */ only single category get*************************************

export async function GET(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category is not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(`Category ${id} get error:`, error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching the category.",
      },
      { status: 500 }
    );
  }
}

//**************************CATEGORY UPDATE*****************************************************

export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const body = await request.json();
    const { name } = body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }
    const generateSlug = slugify(name, {
      lower: true,
      strict: true,
      locale: "tr",
    });

    //Exclude existing category when checking for uniqueness
    const existingCategory = await prisma.category.findFirst({
      where: {
        id: { not: id }, // Except for his own ID
        OR: [{ name }, { slug: generateSlug }],
      },
    });
    if (existingCategory) {
      const field = existingCategory.name === name ? "name" : "slug";
      return NextResponse.json({
        message: `This category ${field} already exist`,
      });
    }

    const updateCategory = await prisma.category.update({
      where: { id },
      data: {
        name: name.trim(),
        slug: generateSlug,
      },
    });

    return NextResponse.json(updateCategory, { status: 200 });
  } catch (error) {
    console.log(`Category ${id} update error`, error);
    return NextResponse.json(
      {
        message: "An error  occurred while fetching the category",
      },
      { status: 500 }
    );
  }
}

//************************* DELETE CATEGORY **********************************************************/

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;
  try {
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    console.log(`Category (${id}) delete error:`, error);
    return NextResponse.json(
      { message: "An error occured while deleting the category." },
      { status: 500 }
    );
  }
}
