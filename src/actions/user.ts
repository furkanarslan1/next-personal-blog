"use server";

import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";

interface FormState {
  message: string | null;
  success: boolean;
}

// **************************** DELETE USER********************************************************************

export async function deleteUserAction(id: string): Promise<FormState> {
  if (!id) {
    return {
      message: "Need a valid ID",
      success: false,
    };
  }

  try {
    await prisma.user.delete({ where: { id: id } });

    //clean the cache and refresh the page
    revalidatePath("/admin/users");

    return {
      message: `Category: ${id} deleted successfully`,
      success: true,
    };
  } catch (error) {
    console.error(`Category: ${id} not deleted`, error);
    return {
      message: "An error occurred while deleting the category",
      success: false,
    };
  }
}
