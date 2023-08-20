//Get the url from USGS GeoJSON Feed.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
//Fetch the data by d3.json
d3.json(url).then(function(data){
  createFeatures(data.features);
});
//Create Function 
function createFeatures(earthquakeData){
  function onEachFeature(feature, layer){
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  };
//Create circle marker.
  function createCircleMarker(feature){
    let options = {
      radius: getRadius(feature.properties.mag),
      color: "white",
      weight: 0.8,
      fillColor: getColor(feature.geometry.coordinates[2]),
      fillOpacity: 0.75,
    }
    let latlng = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
    return L.circleMarker(latlng, options)
  };

  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createCircleMarker
  });

  createMap(earthquakes);
};
//Magnitude of the earthquake by their size and the depth of the earthquake by color
function getRadius(mag) {
  return mag*4;
};

function getColor(depth){
  if (depth < 10) {
    return "#009900"
  }
  else if (depth < 30) {
    return "#80FF00";
  }
  else if (depth < 50) {
    return "#FFFF00";
  }
  else if (depth < 70) {
    return "#FF8000";
  }
  else if (depth < 90) {
    return "#FF9933";
  }
  else {
    return "#FF0000";
  }
};

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let depths = [-10, 10, 30, 50, 70, 90]
    labels = []

    // Add the minimum and maximum.
    let legendInfo = "<h4>Magnitude</h4>"

    div.innerHTML = legendInfo;

  for (let i = 0; i < depths.length; i++) {
    labels.push('<p style="background-color:' + getColor(depths[i] + 1) + '">' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '' : '+') + '</ul>');
  }

  div.innerHTML += labels.join("");
  return div;
};
  legend.addTo(myMap);
}

//Part 2

// let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
// let tectonicurl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
// d3.json(url).then(function(data){
//   createFeatures(data.features);
// });

// function createFeatures(earthquakeData){
//   function onEachFeature(feature, layer){
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
//   };

//   function createCircleMarker(feature){
//     let options = {
//       radius: getRadius(feature.properties.mag),
//       color: "white",
//       weight: 0.8,
//       fillColor: getColor(feature.geometry.coordinates[2]),
//       fillOpacity: 0.75,
//     }
//     let latlng = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
//     return L.circleMarker(latlng, options)
//   };

//   let earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature,
//     pointToLayer: createCircleMarker
//   });

//   createMap(earthquakes);
// };

// function getRadius(mag) {
//   return mag*4;
// };

// function getColor(depth){
//   if (depth < 10) {
//     return "#009900"
//   }
//   else if (depth < 30) {
//     return "#80FF00";
//   }
//   else if (depth < 50) {
//     return "#FFFF00";
//   }
//   else if (depth < 70) {
//     return "#FF8000";
//   }
//   else if (depth < 90) {
//     return "#FF9933";
//   }
//   else {
//     return "#FF0000";
//   }
// };

// function createMap(earthquakes) {

//   // Create the base layers.
//   let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   })

//   let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   });
//   let tectonicPlates = new L.layerGroup();
//   d3.json(tectonicurl).then(function (plates){
//     L.geoJSON(plates, {
//       color: "orange",
//       weight: 2
//     }).addTo(tectonicPlates)
//   });
//   // Create a baseMaps object.
//   let baseMaps = {
//     "Street Map": street,
//     "Topographic Map": topo
//   };

//   // Create an overlay object to hold our overlay.
//   let overlayMaps = {
//     Earthquakes: earthquakes,
//     "Tectonic Plates": tectonicPlates
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load.
//   let myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [street, earthquakes, tectonicPlates]
//   });

//   // Create a layer control.
//   // Pass it our baseMaps and overlayMaps.
//   // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

//   let legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     let div = L.DomUtil.create("div", "info legend");
//     let depths = [-10, 10, 30, 50, 70, 90]
//     //colors = ["#009900", "#80FF00", "#FFFF00", "#FF9933", "#FF0000"]
//     labels = []

//     // Add the minimum and maximum.
//     let legendInfo = "<h4>Magnitude</h4>"

//     div.innerHTML = legendInfo;

//   for (let i = 0; i < depths.length; i++) {
//     labels.push('<p style="background-color:' + getColor(depths[i] + 1) + '">' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '' : '+') + '</ul>');
//   }

//   div.innerHTML += labels.join("");
//   return div;
// };
//   legend.addTo(myMap);
// }

