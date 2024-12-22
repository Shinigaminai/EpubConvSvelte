const dirPath = 'static/converted'; // replace with your folder path
import { readdirSync } from 'fs';

export function getDocuments() {
    let files = readdirSync(dirPath)
    return files;
}