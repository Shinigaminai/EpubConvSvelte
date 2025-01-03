import { readdirSync, readFileSync, writeFileSync, rm, unlink, readdir } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

export type metadata = {
    author: string;
    title: string;
    customCover?: boolean;
}

const dirConvertedPath = 'uploadbox/converted';
const dirTempPath = 'uploadbox/tmp';
const tmpCoverPath = 'uploadbox/cover/cover';
const allowedFiletypes = [
    'application/pdf',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/rtf',
    'text/rtf'
]

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function clear(directory: string) {
    readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            unlink(join(directory, file), (err) => {
                if (err) throw err;
            });
        }
    });
}

function getTargetName(file: File, extension = '.epub') {
    return file.name.replace(/\b\.\w*$/, '') + '.epub';
}

function createConvCommand(file: File, metadata: metadata) {
    // TODO replace all possible filetypes
    const epubFile = getTargetName(file);
    // TODO sanitize
    const target = join(dirTempPath, file.name);
    const output = join(dirConvertedPath, epubFile);
    let metadataFlags = metadata.customCover ? `--cover ${tmpCoverPath}` : '';
    metadataFlags += metadata.author ? `--authors ${metadata.author} ` : '';
    metadataFlags += metadata.title ? `--title ${metadata.title}` : '';
    // --no-default-epub-cover¶
    // return `flatpak --command="sh" run com.calibre_ebook.calibre -c "ebook-convert \\\"${target}\\\" \\\"${output}\\\" ${metadataFlags}"`;
    return `ebook-convert "${target}" "${output}"`;
}

export function getConvertedDocuments() {
    let files = readdirSync(dirConvertedPath)
    return files;
}

export function getEpub(name: string) {
    // TODO check extension and sanitize
    return readFileSync(join(dirConvertedPath, name));
}

export async function convertAndAddDocument(file: File, metadata: metadata, cover?: File) {
    if (!allowedFiletypes.includes(file.type)) throw new Error(`Dateityp ${file.type} ist nicht erlaubt.`);

    metadata.customCover = !!cover;
    if (cover) {
        writeFileSync(tmpCoverPath, Buffer.from(await cover.arrayBuffer()));
    }
    let tmpFilePath = join(dirTempPath, file.name);
    writeFileSync(tmpFilePath, Buffer.from(await file.arrayBuffer()));
    let command = createConvCommand(file, metadata);
    console.log(command);
    execSync(command);
    clear(dirTempPath);
    rm(tmpCoverPath, () => { });
    console.log(`Converted ${file.name} -> ${getTargetName(file)}`);
}