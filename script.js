var mymap = L.map('map').setView([38, -90], 7);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
  
// Cave count by Missouri counties
var MOcaves = new L.LayerGroup();

var caveStyle = {
    "color": "#0000FF",
    "opcaity": 0.75,
};

$.getJSON("https://raw.githubusercontent.com/jvilbig/GIS5091-AdvancedProgramming/Project1/MO_CountyCaveCount.geojson",function(data){
  var caves = L.geoJson(data, {
    style: caveStyle,
    onEachFeature: function (feature, layer) {
    layer.bindPopup("<b>County: </b>" + feature.properties.MAPNAME + "<br>Number of Caves: " + feature.properties.CAVE_COUNT);
    }
  });
    caves.addTo(mymap);
  });

// Sinkholes in Missouri

$.getJSON("https://raw.githubusercontent.com/jvilbig/GIS5091-AdvancedProgramming/Project1/Mo_SinkHoles.json",function(data){
    var sinkIcon = L.icon({
      iconUrl: 'https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/important-point-icon.png',
      iconSize: [30,30]
    });
    var sinks = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: sinkIcon});
        marker.bindPopup(feature.properties);
        return marker;
      }
    });
    var clusters = L.markerClusterGroup();
    clusters.addLayer(sinks);
    mymap.addLayer(clusters);
});


// Fault Lines in Missouri
var faultStyle = {
    "color": "#ff7800",
    "weight": 3,
};

var MOfaults = new L.LayerGroup();
$.getJSON("https://raw.githubusercontent.com/jvilbig/GIS5091-AdvancedProgramming/Project1/MO_FaultLines.geojson",function(data){
  var faults = L.geoJson(data, {
    style: faultStyle,
    onEachFeature: function (feature, layer) {
    layer.bindPopup("<b>Fault Length: </b>" + feature.properties.LENGTH);
    }
  })  
    faults.addTo(mymap);
});