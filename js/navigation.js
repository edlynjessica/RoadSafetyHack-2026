<<<<<<< HEAD

=======
function goToMedical() {
    window.location.href = "medical.html";
}

function goToVehicle() {
    window.location.href = "vehicle.html";
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
>>>>>>> diya-ui
