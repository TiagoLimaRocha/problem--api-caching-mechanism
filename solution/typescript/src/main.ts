import { InMemoryCache } from 'cache';
import { fetchData } from 'fetch';

async function main() {
  const cache = new InMemoryCache<string>(10, 1000);
  await cache.evict();

  const promises = ['uri1', 'uri2', 'uri3'].map((uri: string) =>
    fetchData(uri, cache)
      .then((data) => data)
      .catch((error) => console.error(error))
      .finally(() => console.log(`Executed data fetching for ${uri}`))
  );

  await Promise.all(promises);
}

main();
