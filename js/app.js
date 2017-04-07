'use strict';

var bikeMap = {};

L.mapbox.accessToken = 'pk.eyJ1IjoiZ2thcHBlbmJlcmdlciIsImEiOiJjaXYyOGVxdjIwMDBtMm5sb3Y0Ymt6cGwyIn0.hI8650oyLtAaYPwIi09MHw';

var map = L.mapbox.map('map').setView([52.476, 13.443], 12);

L.mapbox.styleLayer('mapbox://styles/gkappenberger/cj03s66oc008b2rmvj58nstur').addTo(map);

map.attributionControl.setPosition('bottomleft');

bikeMap.bikeShop = L.mapbox.featureLayer().loadURL('./js/bikeshops.geojson').on('ready', function (e) {
  bikeMap.bikeShop.eachLayer(function (layer) {
    var shopName = layer.feature.properties.name;
    var shopUrl;
    if (layer.feature.properties.website) {
      shopUrl = '<a href="' + layer.feature.properties.website + '">link -></a>';
    } else {
      shopUrl = '';
    }
    var shopStreet = layer.feature.properties['addr:street'];
    layer.bindPopup(shopName + '<br>' + shopUrl + '<br>' + shopStreet);
  });
}).on('layeradd', function (e) {
  var marker = e.layer,
      feature = marker.feature;
  marker.setIcon(L.mapbox.marker.icon({
    'marker-size': 'large',
    'marker-symbol': 'bicycle',
    'marker-color': '#e99be9'
  }));
}).addTo(map);

var myIcon = L.icon({
  iconUrl: 'img/icon.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});

bikeMap.members = L.mapbox.featureLayer().loadURL('./js/members.geojson').on('layeradd', function (e) {
  var marker = e.layer,
      feature = marker.feature;
  // custom icon: marker.setIcon(myIcon);
  marker.setIcon(L.mapbox.marker.icon({
    'marker-symbol': 'triangle',
    'marker-size': 'medium',
    'marker-color': '#6495ed'
  }));
}).addTo(map);

bikeMap.neukoelln = L.mapbox.featureLayer().loadURL('./js/neukoelln.geojson').addTo(map);

bikeMap.cobblestone = L.mapbox.featureLayer().loadURL('./js/nk_cobblestones2.geojson').addTo(map);

// map.removeLayer(bikeMap.members);


var southWest = L.latLng(52.442619, 13.351812),
    northEast = L.latLng(52.509379, 13.529153),
    bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);

var southWestFit = L.latLng(52.460273, 13.413183),
    northEastFit = L.latLng(52.492188, 13.466274),
    boundsFit = L.latLngBounds(southWestFit, northEastFit);

map.fitBounds(boundsFit);

map.options.minZoom = 12;

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

bikeMap.filterMenu = document.querySelector('.filter');
bikeMap.filterBtn = document.querySelector('.filter-btn');
var filterOpen;
bikeMap.filterBtn.addEventListener('click', function () {
  if (!filterOpen) {
    bikeMap.filterMenu.classList.remove('off');
    bikeMap.filterBtn.classList.add('open');
    filterOpen = true;
  } else {
    bikeMap.filterMenu.classList.add('off');
    bikeMap.filterBtn.classList.remove('open');
    filterOpen = false;
  }
});

var showFilter = function showFilter() {
  var vw = window.innerWidth;
  if (vw > 1200) {
    bikeMap.filterMenu.classList.remove('off');
    bikeMap.filterBtn.classList.add('open');
    filterOpen = true;
  } else {
    bikeMap.filterMenu.classList.add('off');
    bikeMap.filterBtn.classList.remove('open');
    filterOpen = false;
  }
};

showFilter();

var resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(showFilter(), 100);
});

bikeMap.filterItems = bikeMap.filterMenu.querySelectorAll('.filter-item');

bikeMap.filterItems.forEach(function (element, index) {
  element.addEventListener('click', function (e) {
    alert(e.target.getAttribute(data - toggle));
  });
});