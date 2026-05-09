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