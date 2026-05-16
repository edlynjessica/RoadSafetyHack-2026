async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        localStorage.setItem("userLocation", JSON.stringify(userLocation));
        resolve(userLocation);
      },
      (error) => {
        alert("Location permission required 🚨");
        reject(error);
      }
    );
  });
}

// ✅ CATEGORY CONFIG (GOOD ONE)
const emergencyConfig = {
  minor_injury: { category: "healthcare.hospital,healthcare.clinic" },
  severe_accident: { category: "healthcare.hospital,emergency.ambulance" },
  unconscious_person: { category: "healthcare.hospital,emergency.ambulance" },
  ambulance_required: { category: "emergency.ambulance" },
  maternity: { category: "healthcare.hospital" },
  general_emergency: { category: "healthcare.hospital,emergency.ambulance" },

  vehicle_breakdown: { category: "service.vehicle.repair" },
  flat_tyre: { category: "service.vehicle.repair" },
  out_of_fuel: { category: "service.vehicle.fuel" },
  towing_required: { category: "service.vehicle.towing" },

  general: { category: "healthcare.hospital" }
};

// 🔥 FIX: CLASSIFY PROPERLY
function classifyPlace(category) {
  if (!category) return "Hospital";

  if (category.includes("ambulance")) return "Ambulance";
  if (category.includes("police")) return "Police";
  if (category.includes("towing")) return "Towing";
  if (category.includes("fuel")) return "Fuel";
  if (category.includes("repair")) return "Repair";

  return "Hospital";
}

// 🔥 MAIN FUNCTION (FIXED)
async function findNearbyHospitals(type = "general") {
  try {
    const userLocation = await getLocation();

    const apiKey = "ddb8976a6b3e41a8a020ea37af34ff9e";

    const config = emergencyConfig[type] || emergencyConfig["general"];

    async function fetchPlaces(category) {
      const url =
        `https://api.geoapify.com/v2/places?` +
        `categories=${category}&` +
        `filter=circle:${userLocation.lon},${userLocation.lat},5000&` +
        `bias=proximity:${userLocation.lon},${userLocation.lat}&` +
        `limit=10&` +
        `apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      return data.features || [];
    }

    // 🔥 STEP 1: try actual category
    let places = await fetchPlaces(config.category);

    // 🔥 STEP 2: fallback to hospitals
    if (places.length === 0) {
      console.warn("Fallback → hospitals");
      places = await fetchPlaces("healthcare.hospital");
    }

    // 🔥 STEP 3: still empty → return empty
    if (places.length === 0) return [];

    return places.map(place => {

      const category = place.properties.categories?.[0] || "";
      const type = classifyPlace(category);

      return {
        name: place.properties.name || "Unknown",
        distance: (place.properties.distance / 1000).toFixed(2) + " km",
        lat: place.properties.lat,
        lon: place.properties.lon,
        phone: place.properties.phone || "N/A",
        type
      };
    });

  } catch (error) {
    console.error(error);
    return [];
  }
}

window.findNearbyHospitals = findNearbyHospitals;