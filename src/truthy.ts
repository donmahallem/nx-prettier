/**
 * Package @donmahallem/nx-prettier
 * Source https://github.com/donmahallem/nx-prettier
 */

/**
 * @param inp
 */
export function truthy(inp: unknown) {
    return inp === true || inp === 'true' || inp === 1 || inp === '1';
}
