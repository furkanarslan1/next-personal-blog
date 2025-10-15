"use server";

import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

interface FormState {
  message: string | null;
  success: boolean;
}
/***************************CATEGORY ADD ***********************************************************************************/
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

/***************************CATEGORY DELETE ***********************************************************************************/

export async function deleteCategoryAction(slug: string): Promise<FormState> {
  if (!slug) {
    return {
      message: "Need a valid slug",
      success: false,
    };
  }

  try {
    await prisma.category.delete({ where: { slug: slug } });

    //clean the cache and refresh the page
    revalidatePath("/admin/categories");

    return {
      message: `Category: ${slug} deleted successfully`,
      success: true,
    };
  } catch (error) {
    console.error(`Category: ${slug} not deleted`, error);
    return {
      message: "An error occurred while deleting the category",
      success: false,
    };
  }
}

/***************************CATEGORY UPDATE ***********************************************************************************/

export async function updateCategoryAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const slug = formData.get("slug") as string;
  const newName = formData.get("newName") as string;

  if (!slug || !newName || newName.trim() === "") {
    return { message: "Need a new name", success: false };
  }

  const trimmedNewName = newName.trim();
  const newSlug = slugify(trimmedNewName, {
    lower: true,
    strict: true,
    locale: "tr",
  });

  try {
    //slug control
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: trimmedNewName }, { slug: newSlug }],
        NOT: { slug: slug },
      },
    });

    if (existingCategory) {
      return {
        message: "This name or slug  is used by another category",
        success: false,
      };
    }

    await prisma.category.update({
      where: { slug: slug },
      data: {
        name: trimmedNewName,
        slug: newSlug,
      },
    });

    revalidatePath("/admin/categories");
    return {
      message: "Category updated successfully!",
      success: true,
    };
  } catch (error) {
    console.error("An error occurred while category the updating ", error);
    return {
      message: "An error occurred while category the updating ",
      success: false,
    };
  }
}
