import { error } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export async function load({ params }) {
  const link = await prisma.link.findFirst({
    where: {
      path: params.slug
    }
  })

  if (!link) throw error(404);

  if (link.expires < Date.now()) {
    await prisma.link.delete({
      where: {
        id: link.id
      }
    })
    throw error(404)
  }

  return link;

}
