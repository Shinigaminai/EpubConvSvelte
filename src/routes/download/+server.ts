import * as epubconv from '$lib/epubConv';

export async function GET(event) {
    const docs = epubconv.getConvertedDocuments()
    return new Response(JSON.stringify({ 'documents': docs }));
}