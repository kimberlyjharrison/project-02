console.log("leaflet map goes here")

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
for (var i = 0; i < data.length; i++) {
    var jobPosting = data[i];
    if (jobPosting.Coordinates && jobPosting.Location) {

        jobPostingsArray.push(L.marker(jobPosting.Coordinates)
            .bindPopup("<h1>" + jobPosting.Company + "</h1> <hr> <h3>" + jobPosting.Location +
            "</h3> <hr> <h3>" + jobPosting.Salary_Info + "</h3> <a href=\"" + jobPosting.Link + "\" target=\"_blank\">Find Job Posting Here</a>"));
    }
};

var heatArray = [];
for (var i = 0; i < data.length; i++) {
    var jobPosting = data[i];

    if (jobPosting.Location) {
      heatArray.push(jobPosting.Coordinates);
    };

    var heat = L.heatLayer(heatArray, {
      radius: 80,
      blur: 28,
      minOpacity: 0.55
    });
};

var zillowArray = [];
for (var i = 0; i < zillow.length; i++) {

    if (zillow[i].lat && zillow[i].lng) {
        zillowArray.push([zillow[i].lat, zillow[i].lng])
    }

    var zillowHeat = L.heatLayer(zillowArray, {
        radius: 10,
        blur: 1,
        minOpacity: 0.2,
        gradient: {
            '.2': 'blue',
            '.4': 'green',
            '.6': 'yellow',
            '.8': 'orange',
            '.99': 'red'
        },
    });
};


jobPostingsLayer = L.layerGroup(jobPostingsArray);


var baseMaps = {
  "Street Map(light)": streetmap,
  "Street Map(dark)": darkmap
};

var overlayMaps = {
  "Job Postings": jobPostingsLayer,
  "HeatMap": heat,
  "Median Cost per st ft (Jan 2019)": zillowHeat
};


var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4,
  layers: [streetmap, jobPostingsLayer]
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
