export type CacheItem<T> = {
  value: T;
  expiresAt: number;
}

export type CacheTuple<T> = [string, CacheItem<T>];

export type Cache<T> = Map<string, CacheItem<T>>;