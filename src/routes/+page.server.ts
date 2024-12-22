import type { PageServerLoad } from './$types';
import * as epubconv from '$lib/epubConv';

export const load: PageServerLoad = async () => {
    console.log("Load documents")
    return {
        documents: epubconv.getDocuments(),
    };
};