import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit"

export async function GET(response: any) {
  const url = new URL(response.url.href)
  const params = new URLSearchParams(url.search)
  const path: any = params.get("path")
  const link = await prisma.link.findFirst({
    where: {
      path: path,
    }
    
  })
  
  if (link) {
    return new Response({link}, {
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

export async function POST({request, cookies}) {
  const { requestData } = await request.json()
  
  const link = await prisma.link.create({
    data: {
      path: requestData.path,
      url: requestData.url,
      timer: requestData.timer
    }
  })

  console.log({requestData})
  return json({ requestData })
}
