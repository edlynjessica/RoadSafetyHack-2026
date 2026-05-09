// Main application entry point
// Integrates location, services, offline handling, and UI

import { fetchWithFallback }
from "./offline/fetchWithFallback.js";

async function mockFetchServices() {

  return [
    {
      name: "Apollo Hospital"
    }
  ];
}

fetchWithFallback(mockFetchServices)
  .then((result) => {

    console.log("Fetch Result:", result);

  });

window.fetchWithFallback = fetchWithFallback;

window.mockFetchServices = mockFetchServices;