'use strict';

var bikeMap = {};

L.mapbox.accessToken = 'pk.eyJ1IjoiZ2thcHBlbmJlcmdlciIsImEiOiJjaXYyOGVxdjIwMDBtMm5sb3Y0Ymt6cGwyIn0.hI8650oyLtAaYPwIi09MHw';

var map = L.mapbox.map('map').setView([52.476, 13.443], 5);

L.mapbox.styleLayer('mapbox://styles/gkappenberger/cj03s66oc008b2rmvj58nstur').addTo(map);

map.attributionControl.setPosition('bottomleft');

bikeMap.layer1 = L.mapbox.featureLayer().loadURL('./js/neukoelln.geojson').addTo(map);

bikeMap.layer2 = L.mapbox.featureLayer().loadURL('./js/members.geojson').addTo(map);

L.marker([52.476, 13.443], {
  icon: L.mapbox.marker.icon({
    'marker-size': 'large',
    'marker-symbol': 'bus',
    'marker-color': '#fa0'
  })
}).addTo(map);

var southWest = L.latLng(52.442619, 13.351812),
    northEast = L.latLng(52.509379, 13.529153),
    bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);

var southWestFit = L.latLng(52.460273, 13.413183),
    northEastFit = L.latLng(52.492188, 13.466274),
    boundsFit = L.latLngBounds(southWestFit, northEastFit);

map.fitBounds(boundsFit);

window.toggle = false;
window.toggleBus = false;

function togglePoints() {
  if (!toggle) {
    map.removeLayer(bikeMap.layer2);
  } else {
    map.addLayer(bikeMap.layer2);
  }
  toggle = !toggle;
}

function toggleBus() {
  if (!toggleBus) {
    map.removeLayer(bikeMap.layer3);
  } else {
    map.addLayer(bikeMap.layer3);
  }
  toggleBus = !toggle;
}

bikeMap.filterMenu = document.querySelector('.filter');
bikeMap.filterBtn = bikeMap.filterMenu.querySelector('.filter-btn');
var filterOff = false;

bikeMap.filterBtn.addEventListener('click', function () {
  if (filterOff) {
    bikeMap.filterMenu.classList.remove('off');
    filterOff = false;
  } else {
    bikeMap.filterMenu.classList.add('off');
    filterOff = true;
  }
});