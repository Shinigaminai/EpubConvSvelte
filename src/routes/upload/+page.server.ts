import { fail, type Actions } from '@sveltejs/kit';
import * as epubconv from '$lib/epubConv';

// static file upload to the upload dir without any typechecking

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

        const { fileToUpload } = formData as { fileToUpload: File };

        // Write the file to the static folder
        await epubconv.addDocument(formData.fileToUpload as File);

        return {
            success: true
        };
    }
} satisfies Actions;