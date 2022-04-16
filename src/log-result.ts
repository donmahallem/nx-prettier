/*
 * Package @donmahallem/nx-prettier
 * Source https://github.com/donmahallem/nx-prettier
 */

import { logger } from '@nrwl/devkit';
import path from 'path';
import { Result } from './result';
import type { ExecutorContext } from '@nrwl/devkit';

/**
 * @param res
 * @param opts
 */
export function logResult(res: Result, opts: Pick<ExecutorContext, 'cwd' | 'isVerbose'>): void {
    if (res.success.length > 0 && opts.isVerbose) {
        logger.log(`Correctly formatted files:`);
        for (const fp of res.success) {
            logger.log(path.relative(opts.cwd, fp));
        }
    }
    if (res.warn.length > 0) {
        logger.log(`Correctly formatted files:`);
        for (const fp of res.warn) {
            logger.log(path.relative(opts.cwd, fp));
        }
    }
    if (res.failed.length > 0) {
        logger.error(`Following files need formatting by prettier:`);
        for (const fp of res.failed) {
            logger.error(path.relative(opts.cwd, fp));
        }
    }
}
