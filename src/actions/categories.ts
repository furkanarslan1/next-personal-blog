"use server";

import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

interface FormState {
  message: string | null;
  success: boolean;
}

// get server event and add
export async function addCategoryAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("categoryName") as string;
  if (!name || name.trim() === "") {
    return {
      message: "Please enter a category name",
      success: false,
    };
  }

  try {
    const trimmedName = name.trim();

    //create slug
    const generateSlug = slugify(trimmedName, {
      lower: true,
      strict: true,
      locale: "tr",
    });

    //uniqe control
    const existingCategory = await prisma.category.findFirst({
      where: { OR: [{ name: trimmedName }, { slug: generateSlug }] },
    });

    if (existingCategory) {
      const field = existingCategory.name === trimmedName ? "Name" : "Slug";
      return {
        message: `This category ${field} already exist`,
        success: false,
      };
    }

    //create a category

    await prisma.category.create({
      data: {
        name: trimmedName,
        slug: generateSlug,
      },
    });

    //clear cache and refresh switcher to update data
    revalidatePath("/admin/categories");

    return {
      message: `${trimmedName} category was added succesfully `,
      success: true,
    };
  } catch (error) {
    console.error("An error occurred while adding the category", error);
    return {
      message: "An error occurred while adding the category",
      success: false,
    };
  }
}
