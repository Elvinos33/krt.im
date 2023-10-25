import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

export async function GET(response: URL) {
  const url = new URL(response.url.href)
  const params = new URLSearchParams(url.search)
  const path: any = params.get("path")
  const link = await prisma.link.findFirst({
    where: {
      path: path,
    }
    
  })
  
  if (link) {
    return new Response("Link already exists", {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 302,
    })
  } else {
    return new Response("Link can be created", {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
    })
  }

}
