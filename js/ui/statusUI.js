export function updateDataSourceUI(source) {

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