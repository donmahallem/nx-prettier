/*
 * Package @donmahallem/nx-prettier
 * Source https://github.com/donmahallem/nx-prettier
 */

import { logger } from '@nrwl/devkit';
import fg from 'fast-glob';
import { checkFiles } from './check-files';
import { formatFiles } from './format-files';
import { logResult } from './log-result';
import { Result } from './result';
import { truthy } from './truthy';
import type { ExecutorContext } from '@nrwl/devkit';

export interface EchoExecutorOptions {
    pattern: string;
    write?: string | boolean;
    check?: boolean | string;
}
/**
 * @param options
 * @param context
 */
export default async function echoExecutor(options: EchoExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
    const inputFiles: string[] = [...new Set(await fg(options.pattern, { absolute: true, cwd: context.cwd, dot: true }))];
    if (context.isVerbose) {
        logger.info(`Opts: \n${JSON.stringify(options, undefined, 2)}`);
    }
    if (truthy(options.write)) {
        logger.info(`Formatting ${inputFiles.length} files`);
        const result: Result = await formatFiles(inputFiles);
        logResult(result, context);
        return { success: result.failed.length === 0 };
    } else {
        logger.info(`Checking ${inputFiles.length} files`);
        const result: Result = await checkFiles(inputFiles);
        logResult(result, context);
        return { success: result.failed.length === 0 };
    }
}
