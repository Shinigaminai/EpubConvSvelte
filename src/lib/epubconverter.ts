'use strict';

// based on https://github.com/timursevimli/epubconventer/blob/main/lib/convert.js

import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { exec, execSync } from 'node:child_process';
import { promisify } from 'node:util';
import slugify from 'slugify';
import Kuyruk from 'kuyruk';

try {
    execSync('ebook-convert --version').toString().includes('ebook-convert');
} catch {
    console.log(
        'Please install ebook-convert tool on your machine: https://calibre-ebook.com/download',
    );
    process.exit(1);
}

const queue = new Kuyruk({ concurrency: os.cpus().length - 1 });

const execPromise = promisify(exec);

const progressBar = (progress: number, total = 100) => {
    const barLength = 40;
    const percentage = (progress / total) * 100;
    const filledBarLength = Math.round((barLength * progress) / total);
    const bar =
        '█'.repeat(filledBarLength) + '-'.repeat(barLength - filledBarLength);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Progress: [${bar}] ${percentage.toFixed(2)}%`);
    if (progress === total) process.stdout.write('\n');
};

class EpubConverter {
    constructor({ target: string = '.' + path.sep, output = target } = {}) {
        this.targetPath = target;
        this.outputPath = output;
    }

    #extentionIsPdf(fileName) {
        return path.extname(fileName) === '.pdf';
    }

    #createExecQuery(fileName) {
        const epubFile = fileName.replace('.pdf', '.epub');
        const target = path.join(this.targetPath, fileName);
        const output = path.join(this.outputPath, epubFile);
        return `ebook-convert ${target} ${output}`;
    }

    #toSlugify(fileName) {
        return slugify(fileName, {
            remove: /[^a-zA-Z0-9_\-./]/g,
            replacement: '_',
            lower: true,
        });
    }

    async #checkOutputPath() {
        if (this.targetPath !== this.outputPath) {
            try {
                await fsp.access(this.outputPath);
            } catch {
                await fsp.mkdir(this.outputPath);
            }
        }
    }

    async #renameFile(fileName, toFilename, { isTarget = true } = {}) {
        let target = path.join(this.targetPath, fileName);
        let output = path.join(this.targetPath, toFilename);
        if (!isTarget) {
            target = path.join(this.outputPath, fileName.replace('.pdf', '.epub'));
            output = path.join(this.outputPath, toFilename.replace('.pdf', '.epub'));
        }
        return await fsp.rename(target, output);
    }

    async #isFile(filePath: string) {
        return (await fsp.stat(filePath)).isFile();
    }

    async #getFiles() {
        const dir = await fsp.readdir(this.targetPath);
        const files = [];
        for (const fileName of dir) {
            if (!this.#extentionIsPdf(fileName)) continue;
            if (!this.#isFile(path.join(this.targetPath, fileName))) {
                continue;
            }
            files.push(fileName);
        }
        return files;
    }

    async convert() {
        const files = await this.#getFiles();
        if (files.length === 0) {
            console.log(
                `${this.targetPath} is not include any file with '.pdf' extention`,
            );
            process.exit(1);
        }
        await this.#checkOutputPath();
        let progress = 0;
        for (const fileName of files) {
            const sluggedName = this.#toSlugify(fileName);
            const execQuery = this.#createExecQuery(sluggedName);
            queue.add(async () => {
                await this.#renameFile(fileName, sluggedName);
                await execPromise(execQuery);
                await this.#renameFile(sluggedName, fileName, { isTarget: true });
                await this.#renameFile(sluggedName, fileName, { isTarget: false });
                if (process.stdout.isTTY) progressBar(++progress, files.length);
            });
        }
        return new Promise((resolve, reject) => {
            let resolved = false;
            queue
                .drain(() => {
                    if (!resolved) resolve();
                })
                .failure((err) => {
                    if (!resolved) {
                        resolved = true;
                        queue.clear();
                        reject(err);
                    }
                });
        });
    }
}

module.exports = EpubConverter;