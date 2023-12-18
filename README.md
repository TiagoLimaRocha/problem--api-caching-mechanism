# Problem: Implementing a Caching Mechanism for API Requests

## Background

You are building a web application that frequently makes requests to a third-party API. To improve performance and reduce the number of API calls, you decide to implement a caching mechanism.

## Task

**API Request Function**: Write an asynchronous function in your programming language of choice called `fetchData` (or `fetch_data`). This function should accept a URL (string) as its argument and return the data from the API. Use any HTTP client library of your choice for making the request.

**Caching Mechanism**: Implement a caching mechanism within fetchData. Before making an API call, the function should check if the response for the given URL is already stored in the cache. If it is, return the cached response without making a new API call. If not, make the API call, store the response in the cache, and then return it.

**Cache Expiry**: Introduce a cache expiry feature. Each cached item should be kept for a specific duration (e.g., 2 minutes). If the cached data is older than the expiry duration, it should be considered stale, and a new API request should be made.

**Error Handling**: Implement error handling in your function to manage scenarios where the API request fails (e.g., due to network issues).

Interfaces: Define appropriate interfaces or types for the function inputs and outputs, ensuring type safety throughout your implementation.

## Requirements

- Ensure your code is well-commented and follows best practices for readability and maintainability.
- Consider edge cases for the caching mechanism, such as concurrent requests for the same URL.

### Bonus

- Implement unit tests for your fetchData function covering various scenarios (cache hit, cache miss, error handling, cache expiry).
- Integrate a logging mechanism to log key actions (e.g., cache hit, cache miss, API request made).
