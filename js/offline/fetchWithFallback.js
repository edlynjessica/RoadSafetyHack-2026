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

        console.log("[Road SOS Offline] Browser offline");

        const cachedData = getValidCachedServices();

        if (cachedData) {

            console.log("[Road SOS Offline] Using cached fallback data");

            return {
                source: "cache",
                services: cachedData,
                timestamp: Date.now()
            };
        }

        console.log("[Road SOS Offline] No cached data available");

        return {
            source: "error",
            services: [],
            timestamp: Date.now()
        };
    }

    const internetHealthy = await checkInternetHealth();

    if (!internetHealthy) {

        console.log("[Road SOS Offline] Internet/API unreachable");

        const cachedData = getValidCachedServices();

        if (cachedData) {

            console.log("[Road SOS Offline] Using cached fallback data");

            return {
                source: "cache",
                services: cachedData,
                timestamp: Date.now()
            };
        }

        console.log("[Road SOS Offline] No cached data available");

        return {
            source: "error",
            services: [],
            timestamp: Date.now()
        };
    }
    try {

        const liveServices = await fetchFunction();

        if (!Array.isArray(liveServices) || liveServices.length === 0) {

            throw new Error("Empty service response");
        }

        saveServicesToCache(liveServices);

        console.log("[Road SOS Online] Live data fetched successfully");

        return {
            source: "live",
            services: liveServices,
            timestamp: Date.now()
        };

    }catch (error) {

        console.error("Live fetch failed:", error);

        const cachedData = getValidCachedServices();

        if (cachedData) {

            console.log("[Road SOS Offline] Using cached fallback data");

            return {
                source: "cache",
                services: cachedData || [],
                timestamp: Date.now()
            };
        }

        return {
            source: "error",
            services: []
        };
    }

}