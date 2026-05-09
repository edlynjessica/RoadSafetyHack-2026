// Main application entry point
// Integrates location, services, offline handling, and UI

import {
  isOffline,
  getConnectionStatus,
  listenConnectionChanges,
  checkInternetHealth
} from "./offline/offline.js";



console.log("Offline:", isOffline());

console.log("Status:", getConnectionStatus());



listenConnectionChanges();



checkInternetHealth()
  .then((result) => {

    console.log("Internet Health:", result);

  });