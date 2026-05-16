const servicesContainer = document.getElementById("servicesContainer");

async function loadServices() {

  servicesContainer.innerHTML = "Loading...";

  const situation =
    localStorage.getItem("selectedSituation") || "general";

  try {
    const services =
      await window.findNearbyHospitals(situation);

    servicesContainer.innerHTML = "";

    if (!services || services.length === 0) {
      servicesContainer.innerHTML = "No services found";
      return;
    }

    updateStats(services);

    services.forEach(service => {

      const card = document.createElement("div");
      card.classList.add("service-card");

      const icon =
        service.type.includes("ambulance") ? "🚑" :
        service.type.includes("police") ? "🛡" :
        service.type.includes("towing") ? "🚚" :
        service.type.includes("fuel") ? "⛽" :
        service.type.includes("repair") ? "🔧" :
        "🏥";

      card.innerHTML = `
        <div class="left">
          <div class="icon red">${icon}</div>
          <div class="service-info">
            <h3>${service.name}</h3>
            <p>${service.type} • ${service.distance}</p>
          </div>
        </div>

        <div class="buttons">
          <a href="${service.phone !== 'N/A' ? `tel:${service.phone}` : '#'}" class="call-btn">
            📞 Call
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=${service.lat},${service.lon}"
            target="_blank"
            class="nav-btn"
          >
            📍 Go
          </a>
        </div>
      `;

      servicesContainer.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    servicesContainer.innerHTML = "Error loading services";
  }
}

function updateStats(services) {
  document.getElementById("incidentsCount").textContent = services.length;

  document.getElementById("ambulanceCount").textContent =
    services.filter(s => s.type === "Ambulance").length;

  document.getElementById("traumaCount").textContent =
    services.filter(s => s.type === "Hospital").length;

  document.getElementById("towingCount").textContent =
    services.filter(s => s.type === "Towing").length;
}

loadServices();