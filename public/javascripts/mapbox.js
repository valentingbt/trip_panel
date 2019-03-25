mapboxgl.accessToken = 'pk.eyJ1IjoidmFsZW50aW5ndWliZXJ0IiwiYSI6ImNqc2Q5am9yNjA4Mmc0M2x2endud2R6MGwifQ.OpdYJotdtzgi9SEEiwrezg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-1.5278079999999998, 47.194112],
    zoom: 7
});

var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-1.5278079999999998, 47.194112]
        },
        properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
        }
    }]
};

// add markers to map
geojson.features.forEach(function (marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});