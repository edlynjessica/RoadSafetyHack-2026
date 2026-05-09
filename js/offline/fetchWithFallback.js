// Handles API fetch logic
// Falls back to cached data on failure

import {
  saveServicesToCache,
  getValidCachedServices
} from "./cacheService.js";

import {
  isOffline,
  checkInternetHealth
} from "./offline.js";

export async function fetchWithFallback(fetchFunction) {
    if (isOffline()) {

        console.log("Browser offline — using cache");

        const cachedData = getValidCachedServices();

        return {
            source: "cache",
            services: cachedData
        };
    }

const internetHealthy = await checkInternetHealth();

    if (!internetHealthy) {

        console.log("Internet/API unreachable — using cache");

        const cachedData = getValidCachedServices();

        return {
            source: "cache",
            services: cachedData
        };
    }
    try {

    const liveServices = await fetchFunction();

    if (!liveServices || liveServices.length === 0) {

        throw new Error("Empty service response");
    }

    saveServicesToCache(liveServices);

    console.log("Live data fetched successfully");

    return {
        source: "live",
        services: liveServices
    };

    }catch (error) {

        console.error("Live fetch failed:", error);

        const cachedData = getValidCachedServices();

        if (cachedData) {

            console.log("Using cached fallback data");

            return {
            source: "cache",
            services: cachedData
            };
        }

        return {
            source: "error",
            services: []
        };
    }

}