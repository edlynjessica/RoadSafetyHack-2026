async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };

      // Save location
      localStorage.setItem("userLocation", JSON.stringify(userLocation));

      resolve(userLocation);
    }, reject);
  });
}

const emergencyConfig = {
  minor: {
    category: "healthcare.hospital",
    blocked: ["maternity"],
  },

  severe: {
    category: "healthcare.hospital",
    blocked: ["maternity", "clinic"],
  },

  unconscious: {
    category: "healthcare.hospital",
    blocked: ["maternity"],
  },

  ambulance: {
    category: "healthcare.hospital",
    blocked: [],
  },

  maternity: {
    category: "healthcare.hospital",
    required: ["maternity"],
  },

  general: {
    category: "healthcare.hospital",
    blocked: [],
  },
};

function filterPlaces(features, type) {
  const config = emergencyConfig[type];

  return features.filter((place) => {
    const name = place.properties.name?.toLowerCase() || "";

    // Ignore unnamed places
    if (!name || name.length < 3) {
      return false;
    }

    // Required keywords
    if (config.required) {
      return config.required.some((word) => name.includes(word));
    }

    // Block blocked keywords
    if (config.blocked) {
      return !config.blocked.some((word) => name.includes(word));
    }

    return true;
  });
}

async function findNearbyHospitals(type = "general") {
  try {
    // Get fresh location
    const userLocation = await getLocation();

    const apiKey = "c3d016bb76cb408184b34a4be6f52a39";

    const config = emergencyConfig[type];

    const url =
      `https://api.geoapify.com/v2/places?` +
      `categories=${config.category}&` +
      `filter=circle:${userLocation.lon},${userLocation.lat},5000&` +
      `bias=proximity:${userLocation.lon},${userLocation.lat}&` +
      `limit=10&` +
      `apiKey=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    if (!data.features) {
      console.error("Invalid API response:", data);
      return;
    }

    const hospitals = filterPlaces(data.features, type);
    // Sort nearest first
    hospitals.sort((a, b) => a.properties.distance - b.properties.distance);

    // No results
    if (hospitals.length === 0) {
      console.log("No hospitals found nearby");
      return;
    }

    // Nearest result
    const nearest = hospitals[0];

    console.log("Nearest Hospital:");
    console.log(
      nearest.properties.name,
      "-",
      nearest.properties.distance + " meters",
    );

    console.log("Nearby Hospitals:");

    hospitals.forEach((place, index) => {
      console.log(
        `${index + 1}.`,
        place.properties.name,
        "-",
        place.properties.distance + " meters",
      );
    });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
  }
}

function selectSituation(type) {
  switch (type) {
    case "minor_injury":
      findNearbyHospitals("minor");
      break;

    case "severe_accident":
      findNearbyHospitals("severe");
      break;

    case "unconscious_person":
      findNearbyHospitals("unconscious");
      break;

    case "ambulance_required":
      findNearbyHospitals("ambulance");
      break;

    case "maternity":
      findNearbyHospitals("maternity");
      break;

    case "general_emergency":
      findNearbyHospitals("general");
      break;

    default:
      console.log("Unknown situation");
  }
}
