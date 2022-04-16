/*
 * Package @donmahallem/nx-prettier
 * Source https://github.com/donmahallem/nx-prettier
 */

import { readFile, writeFile } from 'fs/promises';
import { check, format, resolveConfig } from 'prettier';
import { Result } from './result';

/**
 * @param inpFiles
 */
export async function formatFiles(inpFiles: string[]): Promise<Result> {
    const result: Result = { failed: [], success: [], warn: [] };
    for (const inpFile of inpFiles) {
        const cfg = await resolveConfig(inpFile, { useCache: true });
        const sourceData = await readFile(inpFile, { encoding: 'utf-8' });
        try {
            if (
                check(sourceData, {
                    ...cfg,
                    filepath: inpFile,
                })
            ) {
                result.success.push(inpFile);
            }
            const formattedFile = format(sourceData, {
                ...cfg,
                filepath: inpFile,
            });
            await writeFile(inpFile, formattedFile, { encoding: 'utf-8' });
        } catch (err: unknown) {
            result.failed.push(inpFile);
        }
    }
    return result;
}
