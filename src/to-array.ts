/*
 * Package @donmahallem/nx-prettier
 * Source https://github.com/donmahallem/nx-prettier
 */

/**
 * @param asyncIterator
 */
export async function toArray<T>(asyncIterator: AsyncGenerator<T>): Promise<T[]> {
    const arr: T[] = [];
    for await (const i of asyncIterator) arr.push(i);
    return arr;
}
