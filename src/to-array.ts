export async function toArray<T extends unknown>(asyncIterator: AsyncGenerator<T>): Promise<T[]> {
    const arr: T[] = [];
    for await (const i of asyncIterator) arr.push(i);
    return arr;
}
