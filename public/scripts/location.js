function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    document.querySelectorAll(".card").forEach((card, index) => {
      const transportDurationsDiv = card.querySelector(".transport-durations");
      const targetLat = DATA[index].lat;
      const targetLon = DATA[index].lon;

      const baseUrl = "http://router.project-osrm.org/route/v1";
      
      const spans = [...transportDurationsDiv.querySelectorAll("span")].map((span) => ({span, mode: span.querySelector("div").className.split(" ")[1].split("-")[0]}));

      for (const mode of [["car",42], ["walk",4.6], ["bike",18]]) {
        const url = `${baseUrl}/${mode[0]}/${longitude},${latitude};${targetLon},${targetLat}?overview=false`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            duration = data.routes[0].distance / 1000 / mode[1];
            hours = Math.floor(duration);
            minutes = Math.round((duration - hours) * 60);
            spans.find((s) => s.mode === mode[0]).span.innerHTML += `${hours}h ${minutes}m`;
          });
      }
    });
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function getAddressDetails(address) {
  return new Promise((resolve, reject) => {
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}&limit=1&addressdetails=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve({
          lat: data[0].lat,
          lon: data[0].lon,
          address_details: data[0].address,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);
