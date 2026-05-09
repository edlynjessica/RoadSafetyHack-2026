// Handles internet connectivity detection
// Detects online/offline changes
// Provides network status utilities

import { updateDataSourceUI }
from "../ui/statusUI.js";

import {
  createOfflineBanner,
  removeOfflineBanner,
  showOnlineRestoredMessage
} from "./offlineBanner.js";

// Returns true if browser is offline
export function isOffline() {

  return !navigator.onLine;

}

// Returns connection status string
export function getConnectionStatus() {

  return navigator.onLine ? "online" : "offline";

}

// Listen for internet connection changes
export function listenConnectionChanges() {

  window.addEventListener("offline", () => {

    console.log("[Road SOS Offline] Internet connection lost");

    createOfflineBanner();

  });



  window.addEventListener("online", () => {

    console.log("[Road SOS Online] Internet connection restored");

    removeOfflineBanner();

    showOnlineRestoredMessage();

  });

}

// Verifies real internet/API availability
// Verifies real internet availability
export async function checkInternetHealth() {

  try {

    await fetch("https://www.google.com", {
      mode: "no-cors"
    });

    return true;

  } catch (error) {

    return false;

  }
}