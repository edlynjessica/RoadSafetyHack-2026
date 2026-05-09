async function goToMedical() {
  try {
    const location = await getLocation();

    localStorage.setItem("userLocation", JSON.stringify(location));

    window.location.href = "medical.html";
  } catch (error) {
    console.error(error);
  }
}

async function goToVehicle() {
  try {
    const location = await getLocation();

    localStorage.setItem("userLocation", JSON.stringify(location));

    window.location.href = "vehicle.html";
  } catch (error) {
    console.error(error);
  }
}

function goHome() {
  window.location.href = "index.html";
}

function selectSituation(situation) {
  // Store selected situation for integration
  localStorage.setItem("selectedSituation", situation);

  console.log("Selected Situation:", situation);

  // Navigate to services page
  window.location.href = "services.html";
}
