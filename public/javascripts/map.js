(function () {
    var map = new L.Map('map', {
        center: new L.LatLng(47.45733, -2.081144),
        zoom: 12
    }),
        layer = new L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
            minZoom: 5,
            maxZoom: 18
        });

    map.addLayer(layer);

    var pulsingIcon = L.icon.pulse({ iconSize: [40, 40], color: 'red' });
    var marker = L.marker([47.476912, -2.056997], { icon: pulsingIcon }).addTo(map);
    var marker = L.marker([47.436724, -2.089398], { icon: pulsingIcon }).addTo(map);

    var valIcon = L.icon({
        iconUrl: './assets/icons/icone_valentin.png',

        iconSize: [40, 40], // size of the icon
    });

    var floIcon = L.icon({
        iconUrl: './assets/icons/icone_florian.png',

        iconSize: [40, 40], // size of the icon
    });

    var val = L.marker([47.476912, -2.056997], { icon: valIcon }).addTo(map);
    var flo = L.marker([47.436724, -2.089398], { icon: floIcon }).addTo(map);
})();

function geoloc() { // ou tout autre nom de fonction
    var geoSuccess = function (position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
        startPos = position;
        userlat = startPos.coords.latitude;
        userlon = startPos.coords.longitude;
        console.log("lat: " + userlat + " - lon: " + userlon);
    };
    var geoFail = function () { // Ceci s'exécutera si l'utilisateur refuse la géolocalisation
        console.log("refus");
    };
    // La ligne ci-dessous cherche la position de l'utilisateur et déclenchera la demande d'accord
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
}