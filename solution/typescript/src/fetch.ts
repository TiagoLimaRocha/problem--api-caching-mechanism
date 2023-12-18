import axios from 'axios';
import { InMemoryCache } from 'cache';

export async function fetchData<T>(
  url: string,
  cache: InMemoryCache<T>
): Promise<T> {
  try {
    const cachedValue = await cache
      .get(url)
      .then((data) => data)
      .catch((error) => console.error(error));

    if (cachedValue) {
      return cachedValue;
    }

    const { data } = await axios.get(url);
    await cache.set(url, data);

    return data as T;
  } catch (error) {
    throw error;
  }
}
