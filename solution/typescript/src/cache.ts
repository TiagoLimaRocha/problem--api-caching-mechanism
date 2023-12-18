import { Cache, CacheItem, CacheTuple } from 'types';

export class InMemoryCache<T> {
  private cache: Cache<T>;
  private readonly maxSize: number;
  private readonly ttl: number;

  constructor(maxSize: number, ttl: number) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  /**
   * Sets a key-value pair in the cache.
   * If the cache size exceeds the maximum size, the oldest item will be evicted.
   * @param key - The key of the item to be stored in the cache.
   * @param value - The value to be associated with the key in the cache.
   * @returns void
   */
  public async set(key: string, value: T): Promise<void> {
    // Max Size exceeded, must evict
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    // Otherwise just set the value
    const expiresAt = Date.now() + this.ttl;
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Retrieves the value associated with the specified key from the cache.
   *
   * @param key - The key of the item to retrieve.
   * @returns The value associated with the key, or null if the item is not found or has expired.
   */
  public async get(key: string): Promise<T | null> {
    const itemExists = await this.has(key);
    if (!itemExists) {
      throw new Error(`Item with key ${key} does not exist in cache.`)
    }

    const item = this.cache.get(key);
    if (!item || this.isExpired(item)) {
      return null;
    }
    return item.value;
  }

  /**
   * Checks if the cache contains a specific key.
   *
   * @param key - The key to check for in the cache.
   * @returns `true` if the cache contains the key, `false` otherwise.
   */
  public async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  /**
   * Evicts expired items from the cache.
   */
  public async evict(): Promise<void> {
    const promises = Array.from(this.cache.keys()).map((key: string) =>
      this.delete(key)
    );

    await Promise.all(promises);
  }

  /**
   * Deletes a key from the cache if the item's ttl has expired.
   *
   * @param key - The key to delete from the cache.
   */
  private async delete(key: string): Promise<void> {
    const item = this.cache.get(key);

    if (!item) {
      return;
    }

    if (this.isExpired(item)) {
      this.cache.delete(key);
    }
  }

  /**
   * Checks if a cache item is expired.
   * @param item The cache item to check.
   * @returns True if the cache item is expired, false otherwise.
   */
  private isExpired(item: CacheItem<T>): boolean {
    return item.expiresAt < Date.now();
  }
}
