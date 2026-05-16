const servicesContainer = document.getElementById("servicesContainer");

const services = [

  {
    icon:"H",
    iconColor:"red",
    name:"Apollo Trauma Centre",
    type:"Hospital",
    distance:"1.2 km",
    phone:"9876543210",
    lat:13.0827,
    lng:80.2707
  },

  {
    icon:"H",
    iconColor:"blue",
    name:"City Care Hospital",
    type:"Hospital",
    distance:"2.4 km",
    phone:"9999999999",
    lat:13.05,
    lng:80.22
  },

  {
    icon:"🚑",
    iconColor:"red",
    name:"LifeLine Ambulance",
    type:"Ambulance",
    distance:"1 km",
    phone:"8888888888",
    lat:13.04,
    lng:80.25
  },

  {
    icon:"🛡",
    iconColor:"yellow",
    name:"Highway Police Station",
    type:"Police",
    distance:"1.8 km",
    phone:"7777777777",
    lat:13.08,
    lng:80.28
  },

  {
    icon:"🚚",
    iconColor:"orange",
    name:"RoadResQ Towing",
    type:"Towing",
    distance:"2.2 km",
    phone:"6666666666",
    lat:13.06,
    lng:80.26
  }

];


function displayServices(data){

  data.forEach(service => {

    const card = document.createElement("div");

    card.classList.add("service-card");

    card.innerHTML = `

      <div class="left">

        <div class="icon ${service.iconColor}">
          ${service.icon}
        </div>

        <div class="service-info">

          <h3>${service.name}</h3>

          <p>
            ${service.type} • ${service.distance}
          </p>

        </div>

      </div>

      <div class="buttons">

        <a href="tel:${service.phone}" class="call-btn">
          📞 Call
        </a>

        <a
          href="https://www.google.com/maps/search/?api=1&query=${service.lat},${service.lng}"
          target="_blank"
          class="nav-btn"
        >
          📍 Go
        </a>

      </div>

    `;

    servicesContainer.appendChild(card);

  });

}

displayServices(services);