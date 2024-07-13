const socket = io("http://localhost:3000"); // Connect to Socket.io server

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (err) => {
      console.log(err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}

let map = L?.map("map").setView([0, 0], 10);
L?.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
  attribution: "Open",
}).addTo(map);

const marker = {};

socket?.on("recive-location", (data) => {
  const { id, latitude, longitude } = data;
  map?.setView([latitude, longitude]);
  if (marker[id]) {
    marker[id]?.setLatLng([latitude, longitude]);
  } else {
    marker[id] = L?.marker([latitude, longitude]).addTo(map);
  }
});
