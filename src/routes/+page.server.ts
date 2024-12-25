import type { PageServerLoad } from './$types';
import * as epubconv from '$lib/epubConv';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    console.log("Load documents")
    return {
        documents: epubconv.getDocuments(),
    };
};

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        if (
            !(formData.fileToUpload as File).name ||
            (formData.fileToUpload as File).name === 'undefined'
        ) {
            return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
            });
        }

        console.log("recieved file to convert")

        await epubconv.convertAdd(formData.fileToUpload as File);

        console.log("converted")

        return {
            success: true
        };
    }
} satisfies Actions;