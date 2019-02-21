function geoloc(){ // ou tout autre nom de fonction
    var geoSuccess = function(position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
        startPos = position;
        userlat = startPos.coords.latitude;
        userlon = startPos.coords.longitude;
        console.log("lat: "+userlat+" - lon: "+userlon);
    };
    var geoFail = function(){ // Ceci s'exécutera si l'utilisateur refuse la géolocalisation
        console.log("refus");
    };
    // La ligne ci-dessous cherche la position de l'utilisateur et déclenchera la demande d'accord
    navigator.geolocation.getCurrentPosition(geoSuccess,geoFail);
}