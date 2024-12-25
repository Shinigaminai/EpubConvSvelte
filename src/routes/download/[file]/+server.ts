import { getEpub } from "$lib/epubConv"
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => {
  const fileObj = getEpub(params.file);

  return new Response(
    fileObj,
    {
      status: 200,
      headers: {
        "Content-type": "application/epub",
        "Content-Disposition": "attachment; filename=" + params.file
      }
    }
  )
}