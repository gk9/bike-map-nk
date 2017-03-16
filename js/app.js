'use strict';

L.mapbox.accessToken = 'pk.eyJ1IjoiZ2thcHBlbmJlcmdlciIsImEiOiJjaXYyOGVxdjIwMDBtMm5sb3Y0Ymt6cGwyIn0.hI8650oyLtAaYPwIi09MHw';
var map = L.mapbox.map('map').setView([52.476, 13.443], 14);

L.mapbox.styleLayer('mapbox://styles/gkappenberger/cj03s66oc008b2rmvj58nstur').addTo(map);

map.attributionControl.setPosition('bottomleft');

var featureLayer = L.mapbox.featureLayer().addTo(map);

featureLayer.loadURL('/js/neukoelln.geojson');

var featureLayer2 = L.mapbox.featureLayer().loadURL('/js/members.geojson').addTo(map);