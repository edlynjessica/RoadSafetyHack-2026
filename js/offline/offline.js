// Handles internet connectivity detection
// Detects online/offline changes
// Provides network status utilities

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

  window.addEventListener("online", () => {

    console.log("Internet connection restored");

  });



  window.addEventListener("offline", () => {

    console.log("Internet connection lost");

  });

}

// Verifies real internet/API availability
export async function checkInternetHealth() {

  try {

    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "HEAD"
      }
    );

    return response.ok;

  } catch (error) {

    return false;

  }
}