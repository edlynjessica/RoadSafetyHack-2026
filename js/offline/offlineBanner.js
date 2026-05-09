// Handles offline warning UI
// Displays connection status messages

let bannerElement = null;

export function createOfflineBanner() {

  if (bannerElement) {
    return;
  }

  bannerElement = document.createElement("div");

  bannerElement.id = "offline-banner";

  bannerElement.textContent =
    "You are offline. Showing cached emergency services.";

  bannerElement.style.position = "fixed";
  bannerElement.style.top = "0";
  bannerElement.style.left = "0";
  bannerElement.style.width = "100%";

  bannerElement.style.backgroundColor = "#d32f2f";

  bannerElement.style.color = "white";

  bannerElement.style.padding = "12px";

  bannerElement.style.textAlign = "center";

  bannerElement.style.fontWeight = "bold";

  bannerElement.style.zIndex = "9999";

  document.body.appendChild(bannerElement);
}

export function removeOfflineBanner() {

  if (bannerElement) {

    bannerElement.remove();

    bannerElement = null;
  }
}

export function showOnlineRestoredMessage() {

  const message = document.createElement("div");

  message.textContent =
    "Internet connection restored.";

  message.style.position = "fixed";

  message.style.top = "0";

  message.style.left = "0";

  message.style.width = "100%";

  message.style.backgroundColor = "#2e7d32";

  message.style.color = "white";

  message.style.padding = "12px";

  message.style.textAlign = "center";

  message.style.fontWeight = "bold";

  message.style.zIndex = "9999";

  document.body.appendChild(message);



  setTimeout(() => {

    message.remove();

  }, 3000);
}