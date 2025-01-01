import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import * as epubconv from '$lib/epubConv';

export const load: PageServerLoad = async () => {
    console.log("Load documents");
    return {
        documents: epubconv.getConvertedDocuments(),
    };
};

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        let file = (formData.fileToUpload as File)
        let title = (formData.title as string)
        let author = (formData.author as string)
        let cover = (formData.cover as File)
        let metadata: epubconv.metadata = { 'author': author, 'title': title }

        if (!file.name || file.name === 'undefined') {
            return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
            });
        }

        // console.log("recieved file to convert: " + file.name)
        // console.log("and author " + author + " and title " + title)
        // console.log("cover name: " + cover?.name);

        try {
            await epubconv.convertAndAddDocument(file, metadata, cover);
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                return fail(400, { error: true, message: err.message });
            }
            return fail(400, { error: true, message: "server side error" });
        }

        return {
            success: true
        };
    }
} satisfies Actions;