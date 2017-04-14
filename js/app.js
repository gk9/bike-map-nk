'use strict';

L.mapbox.accessToken = 'pk.eyJ1IjoiZ2thcHBlbmJlcmdlciIsImEiOiJjaXYyOGVxdjIwMDBtMm5sb3Y0Ymt6cGwyIn0.hI8650oyLtAaYPwIi09MHw';
var map = L.mapbox.map('map').setView([52.476, 13.443], 12);
L.mapbox.styleLayer('mapbox://styles/gkappenberger/cj03s66oc008b2rmvj58nstur').addTo(map);
map.attributionControl.setPosition('bottomleft');
map.zoomControl.setPosition('topleft');

var bikeMap = {};

// geojson layers

bikeMap.bikeShops = L.mapbox.featureLayer().loadURL('./js/bikeshops.geojson').on('ready', function (e) {
  bikeMap.bikeShops.eachLayer(function (layer) {
    var shopName = layer.feature.properties.name;
    var shopHead, shopStreet, shopStreetNr;
    if (layer.feature.properties.website) {
      shopHead = '<a href="' + layer.feature.properties.website + '" target="_blank">' + shopName + '</a>';
    } else {
      shopHead = shopName;
    }
    if (layer.feature.properties['addr:street']) {
      shopStreet = layer.feature.properties['addr:street'];
      shopStreetNr = layer.feature.properties['addr:housenumber'];
    } else {
      shopStreet = '';
      shopStreetNr = '';
    }
    layer.bindPopup('<div class="popupHead">' + shopHead + '</div>' + shopStreet + '&nbsp;' + shopStreetNr, {
      maxWidth: 300
    });
  });
}).on('layeradd', function (e) {
  var marker = e.layer,
      feature = marker.feature;
  marker.setIcon(L.mapbox.marker.icon({
    'marker-size': 'large',
    'marker-symbol': 'bicycle',
    'marker-color': '#FFC344'
  }));
}).addTo(map);

bikeMap.members = L.mapbox.featureLayer().loadURL('./js/members.geojson').on('ready', function (e) {
  bikeMap.members.eachLayer(function (layer) {
    var memberName = layer.feature.properties.name;
    var memberStreet, memberHead;
    if (layer.feature.properties.website) {
      memberHead = '<a href="' + layer.feature.properties.website + '" target="_blank">' + memberName + '</a>';
    } else {
      memberHead = memberName;
    }
    if (layer.feature.properties.street) {
      memberStreet = layer.feature.properties.street;
    } else {
      memberStreet = '';
    }
    layer.bindPopup('<div class="popupHead">' + memberHead + '</div>' + memberStreet, {
      maxWidth: 300
    });
  });
}).on('layeradd', function (e) {
  var marker = e.layer,
      feature = marker.feature;
  marker.setIcon(L.mapbox.marker.icon({
    'marker-symbol': 'm',
    'marker-size': 'large',
    'marker-color': '#7EC0EE'
  }));
}).addTo(map);

bikeMap.neukoelln = L.mapbox.featureLayer().loadURL('./js/neukoelln.geojson').addTo(map);

bikeMap.cobblestone = L.mapbox.featureLayer().loadURL('./js/cobblestone.geojson').on('layeradd', function (e) {
  var line = e.layer;
  line.setStyle({
    color: '#D05D00',
    weight: 2,
    dashArray: "5, 10, 5, 10"
  });
}).addTo(map);

var cargoIcon = L.icon({
  iconUrl: 'img/icon-cargo-b.png',
  iconSize: [40, 22],
  iconAnchor: [20, 11],
  popupAnchor: [0, -10]
});

bikeMap.cargoBikes = L.mapbox.featureLayer().loadURL('./js/cargobikes.geojson').on('ready', function (e) {
  bikeMap.cargoBikes.eachLayer(function (layer) {
    var cargoName = layer.feature.properties.name;
    var cargoUrl = '<a href="' + layer.feature.properties.url + '" target="_blank">Kontakt -></a>';
    var cargoStreet = layer.feature.properties.street;
    layer.bindPopup('<div class="popupHead">' + cargoName + '</div>' + cargoStreet + '<br>' + cargoUrl, {
      maxWidth: 300
    });
  });
}).on('layeradd', function (e) {
  var marker = e.layer,
      feature = marker.feature;
  marker.setIcon(cargoIcon);
}).addTo(map);

// Initial zoom fit to bounds

var southWestFit = L.latLng(52.460273, 13.413183),
    northEastFit = L.latLng(52.492188, 13.466274),
    boundsFit = L.latLngBounds(southWestFit, northEastFit);

map.fitBounds(boundsFit);

map.options.minZoom = 12;

// filter menu

bikeMap.filterHead = document.querySelector('.filter-head');
bikeMap.filterMenu = document.querySelector('.filter');
bikeMap.menuBtn = document.querySelector('.menu-btn');
var filterOpen;
bikeMap.filterHead.addEventListener('click', function () {
  if (!filterOpen) {
    bikeMap.filterMenu.classList.remove('off');
    bikeMap.menuBtn.classList.add('is-active');
    filterOpen = true;
  } else {
    bikeMap.filterMenu.classList.add('off');
    bikeMap.menuBtn.classList.remove('is-active');
    filterOpen = false;
  }
});

bikeMap.filterItems = bikeMap.filterMenu.querySelectorAll('.filter-item');
bikeMap.members.visible = true;
bikeMap.bikeShops.visible = true;
bikeMap.cobblestone.visible = true;
bikeMap.cargoBikes.visible = true;

bikeMap.filterItems.forEach(function (element, index) {
  element.addEventListener('click', function (e) {
    var layerName = e.target.getAttribute('data-layer');
    if (bikeMap[layerName].visible) {
      map.removeLayer(bikeMap[layerName]);
      bikeMap[layerName].visible = false;
      e.target.classList.remove('is-active');
    } else {
      map.addLayer(bikeMap[layerName]);
      bikeMap[layerName].visible = true;
      e.target.classList.add('is-active');
    }
  });
});

// layout

var showFilter = function showFilter() {
  var vw = window.innerWidth;
  if (vw > 1200) {
    bikeMap.filterMenu.classList.remove('off');
    bikeMap.menuBtn.classList.add('is-active');
    filterOpen = true;
  } else {
    bikeMap.filterMenu.classList.add('off');
    bikeMap.menuBtn.classList.remove('is-active');
    filterOpen = false;
  }
};
showFilter();
var resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(showFilter(), 100);
});