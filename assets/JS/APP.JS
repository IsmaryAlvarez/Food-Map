$.fn.center = function () {
  this.css("position","absolute");
  this.css("top", Math.max(0, (
    ($(window).height() - $(this).outerHeight()) / 2) + 
     $(window).scrollTop()) + "px"
  );
  this.css("left", Math.max(0, (
    ($(window).width() - $(this).outerWidth()) / 2) + 
     $(window).scrollLeft()) + "px"
  );
  return this;
}


$("#overlay").show();
$("#overlay-content").show().center();

setTimeout(function(){    
  $("#overlay").fadeOut();
}, 2000);

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: {lat: -33.4724712, lng: -70.9107133},
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  function buscar() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  var latitud, longitud;
  var funcionExito = function (posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;
    var miUbicacion = new google.maps.Marker({
      position : {lat: latitud, lng: longitud},
      animation: google.maps.Animation.DROP,
      map: map,
    });
    map.setZoom(15);
    map.setCenter({lat: latitud, lng: longitud});

    var pyrmont = {lat: latitud, lng: longitud};

 var infowindow;
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

$('#restaurantes').click(function() {
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['restaurant'],
  }, callback);
});

$('#pastelerias').click(function() {
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['bakery'],
  }, callback);
});

$('#delivery').click(function() {
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['meal_delivery'],
  }, callback);
});

$('#llevar').click(function() {
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['meal_takeaway'],
  }, callback);
});

$('#cafe').click(function() {
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['cafe'],
  }, callback);
});


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  } 
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

 google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong></div>');
              infowindow.open(map, this);
  });
} 

  }

  var funcionError = function (error) {
    alert("Tenemos problemas encontrando tu ubicación");
  }
  
  buscar();  
}


  