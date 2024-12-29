import { readdirSync, readFileSync, writeFileSync, rm } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const dirConvertedPath = 'uploadbox/converted';
const dirTempPath = 'uploadbox/tmp';
const allowedFiletypes = ['application/vnd.oasis.opendocument.text', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/rtf']

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getTargetName(file: File, extension = '.epub') {
    return file.name.replace(/\b\.\w*$/, '') + '.epub';
}

function createConvCommand(file: File) {
    // TODO replace all possible filetypes
    const epubFile = getTargetName(file);
    // TODO sanitize
    const target = join(dirTempPath, file.name);
    const output = join(dirConvertedPath, epubFile);
    // return `flatpak --command="sh" run com.calibre_ebook.calibre -c "ebook-convert ${target} ${output}"`;
    return `ebook-convert ${target} ${output}`;
}

export function getConvertedDocuments() {
    let files = readdirSync(dirConvertedPath)
    return files;
}

export function getEpub(name: string) {
    // TODO check extension and sanitize
    return readFileSync(join(dirConvertedPath, name));
}

export async function convertAndAddDocument(file: File) {
    if (!allowedFiletypes.includes(file.type)) throw new Error(`Dateityp ${file.type} ist nicht erlaubt.`);

    let tmpFilePath = join(dirTempPath, file.name);
    writeFileSync(tmpFilePath, Buffer.from(await file.arrayBuffer()));
    execSync(createConvCommand(file));
    rm(tmpFilePath, () => { }) //console.log('removed tmp file') })
    console.log(`Converted ${file.name} -> ${getTargetName(file)}`)
}