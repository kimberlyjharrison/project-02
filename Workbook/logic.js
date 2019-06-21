var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var jobPostingsArray = [];
var heatArray = [];


for (var i = 0; i < data.length; i++) {
    var jobPosting = data[i];
    if (jobPosting.Coordinates && jobPosting.Location) {

        jobPostingsArray.push(L.marker(jobPosting.Coordinates)
            .bindPopup("<h1>" + jobPosting.Company + "</h1> <hr> <h3>" + jobPosting.Location +
            "</h3> <hr> <h3>" + jobPosting.Salary_Info + "</h3> <a href=\"" + jobPosting.Link + "\" target=\"_blank\">Find Job Posting Here</a>"));
    }
};
for (var i = 0; i < data.length; i++) {
    var jobPosting = data[i];

    if (jobPosting.Location) {
      heatArray.push(jobPosting.Coordinates);
    };

    var heat = L.heatLayer(heatArray, {
      radius: 100,
      blur: 28,
      minOpacity: 0.55
    });
};

jobPostingsLayer = L.layerGroup(jobPostingsArray);


var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

var overlayMaps = {
  "Job Postings": jobPostingsLayer,
  "HeatMap": heat
};


var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [streetmap, jobPostingsLayer]
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
