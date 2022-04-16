/*
 * Package @donmahallem/nx-prettier
 * Source https://github.com/donmahallem/nx-prettier
 */

import { expect } from 'chai';
import 'mocha';
import defaultConfig from './index';

describe('index', (): void => {
    it('should set all plugins with default config', (): void => {
        expect(defaultConfig).to.not.equal(0);
    });
});
