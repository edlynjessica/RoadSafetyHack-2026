// Handles caching emergency services
// Saves/retrieves data from localStorage
// Manages cache expiry
// Cache configuration
const CACHE_KEY = "roadSOS_services";

const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

// 24 hours
export function saveServicesToCache(data) {

  try {

    const cacheObject = {
      timestamp: Date.now(),
      data: data
    };

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify(cacheObject)
    );

    console.log("Services cached successfully");

  } catch (error) {

    console.error("Failed to save cache:", error);

  }
}

export function getCachedServices() {

  try {

    const cached = localStorage.getItem(CACHE_KEY);

    if (!cached) {
      return null;
    }

    return JSON.parse(cached);

  } catch (error) {

    console.error("Failed to retrieve cache:", error);

    return null;
  }
}

export function isCacheExpired(timestamp) {

  const now = Date.now();

  return (now - timestamp) > CACHE_EXPIRY_MS;
}

export function clearCache() {

  localStorage.removeItem(CACHE_KEY);

  console.log("Cache cleared");
}

export function getValidCachedServices() {

  const cached = getCachedServices();

  if (!cached) {
    return null;
  }

  const expired = isCacheExpired(cached.timestamp);

  if (expired) {

    clearCache();

    console.log("Cache expired");

    return null;
  }

  return cached.data;
}