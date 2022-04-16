/*
 * Package @donmahallem/rollup-config
 * Source https://github.com/donmahallem/rollup-config/
 */
import type { ExecutorContext } from '@nrwl/devkit';
import { logger } from '@nrwl/devkit';
import fg from 'fast-glob';
import { truthy } from './truthy';
import { formatFiles } from './format-files';
import { Result } from './result';
import { checkFiles } from './check-files';
import { logResult } from './log-result';

export interface EchoExecutorOptions {
    pattern: string;
    write?: string | boolean;
    check?: boolean | string;
}
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
