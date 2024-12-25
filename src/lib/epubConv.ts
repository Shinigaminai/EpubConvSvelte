import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dirConvertedPath = 'static/converted'; // replace with your folder path
const dirTempPath = 'static/tmp';

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function getConvertedDocuments() {
    let files = readdirSync(dirConvertedPath)
    return files;
}

export function getEpub(name: string) {
    // TODO check extension
    return readFileSync(join(dirConvertedPath, name));
}

export async function convertAndAddDocument(file: File) {
    writeFileSync(join(dirTempPath, file.name), Buffer.from(await file.arrayBuffer()))
    console.log('The file has been saved temporarily');
}