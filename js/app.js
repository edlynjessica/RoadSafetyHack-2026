// Main application entry point
// Integrates location, services, offline handling, and UI

import {
  saveServicesToCache,
  getValidCachedServices
} from "./offline/cacheService.js";


// Test data
const testServices = [
  {
    name: "Apollo Hospital"
  }
];



// STEP 1:
// Uncomment this ONLY ONCE to create cache

//saveServicesToCache(testServices);



// STEP 2:
// Keep this active

const cached = getValidCachedServices();

console.log("Cached Data:", cached);