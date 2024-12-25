const dirPath = 'static/converted'; // replace with your folder path
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export function getDocuments() {
    let files = readdirSync(dirPath)
    return files;
}

export function getEpub(name: string) {
    // TODO check extension
    return readFileSync(join(dirPath, name));
}