// Main application entry point
// Integrates location, services, offline handling, and UI

import {
  isOffline,
  getConnectionStatus,
  listenConnectionChanges,
  checkInternetHealth
} from "./offline/offline.js";

import {
  saveServicesToCache,
  getValidCachedServices
} from "./offline/cacheService.js";

import { fetchWithFallback }
from "./offline/fetchWithFallback.js";



// -----------------------------
// MOCK SERVICE FETCH FUNCTION
// -----------------------------

async function mockFetchServices() {

  return [
    {
      id: "hospital-1",
      name: "Apollo Hospital",
      category: "hospital",
      distance: "1.2 km"
    },

    {
      id: "police-1",
      name: "Chennai Police Station",
      category: "police",
      distance: "2.1 km"
    }
  ];
}



// -----------------------------
// UI STATUS UPDATE
// -----------------------------

function updateDataSourceUI(source) {

  const statusElement =
    document.getElementById("data-source-status");

  if (!statusElement) {
    return;
  }

  if (source === "live") {

    statusElement.textContent =
      "Live emergency data";

    statusElement.style.color = "green";
  }

  else if (source === "cache") {

    statusElement.textContent =
      "Showing cached emergency data";

    statusElement.style.color = "orange";
  }

  else {

    statusElement.textContent =
      "Unable to load emergency services";

    statusElement.style.color = "red";
  }
}



// -----------------------------
// CONNECTION TESTS
// -----------------------------

console.log("Offline:", isOffline());

console.log("Status:", getConnectionStatus());

listenConnectionChanges();



checkInternetHealth()
  .then((result) => {

    console.log("Internet Health:", result);

  });



// -----------------------------
// FETCH + FALLBACK TEST
// -----------------------------

fetchWithFallback(mockFetchServices)
  .then((result) => {

    console.log("Fetch Result:", result);

    updateDataSourceUI(result.source);

  });



// -----------------------------
// GLOBAL TESTING ACCESS
// -----------------------------

window.fetchWithFallback = fetchWithFallback;

window.mockFetchServices = mockFetchServices;

window.saveServicesToCache = saveServicesToCache;

window.getValidCachedServices = getValidCachedServices; 