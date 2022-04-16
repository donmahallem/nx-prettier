/*
 * Package @donmahallem/nx-prettier
 * Source https://github.com/donmahallem/nx-prettier
 */

import { logger } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';
import type { ExecutorContext } from '@nrwl/devkit';

export interface EchoExecutorOptions {
    pattern: string;
    loglevel?: string;
    write?: string | boolean;
    check?: boolean | string;
    listDifferent?: boolean | string;
}

/**
 * @param options
 * @param context
 */
export default async function echoExecutor(options: EchoExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
    let cmd = `prettier`;
    if (options?.loglevel) {
        cmd += ` --loglevel ${options.loglevel}`;
    }
    if (options.write === true || options.write === 'true') {
        cmd += ' --write';
    }
    if (options.check === true || options.check === 'true') {
        cmd += ' --check';
    }
    if (options.listDifferent === true || options.listDifferent === 'true') {
        cmd += ' --list-different';
    }
    if (Array.isArray(options.pattern)) {
        cmd += ` ${options.pattern.join(' ')}`;
    } else {
        cmd += ` ${options.pattern}`;
    }
    if (context.isVerbose) {
        logger.info(`Executing "prettier"...`);
        logger.info(`Options: ${JSON.stringify(options, null, 2)}`);
        logger.info(`context: ${JSON.stringify(context, null, 2)}`);
        logger.info(`Using prettier command:\n${cmd}`);
    }
    const query = promisify(exec)(cmd);
    const { stdout, stderr } = await query;

    logger.log(stdout);
    logger.error(stderr);

    return { success: query.child.exitCode === 0 };
}
