const dirPath = 'static/converted'; // replace with your folder path
import { readdirSync, readFileSync, writeFile } from 'fs';
import { join } from 'path';

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function getDocuments() {
    let files = readdirSync(dirPath)
    return files;
}

export function getEpub(name: string) {
    // TODO check extension
    return readFileSync(join(dirPath, name));
}

export async function addDocument(fileToUpload: File) {
    // Write the file to the static folder
    return writeFile(`static/${fileToUpload.name}`, Buffer.from(await fileToUpload.arrayBuffer()), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

export async function convertAdd(file: File) {
    await sleep(1000);
}