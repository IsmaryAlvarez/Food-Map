/**
 * Función centrado de imagen en vista splash
 */

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

/**
 * cargado de función vista splash
 */
$("#overlay").show();
$("#overlay-content").show().center();

setTimeout(function(){    
  $("#overlay").fadeOut();
}, 2000);

/**
 * Función circulo vista splash
 */
$('#circle').circleProgress({
 value: 1,
 fill: {gradient: [['#e78016', .5], ['#fbbd00', .5]], gradientAngle: Math.PI / 4}

}).on('circle-animation-progress', function(event, progress, stepValue) {
  $(this).find('strong').text(stepValue.toFixed(2).substr(1));
  
});

/**
 * Función ubicación gps
 */
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

$('.col-sm-4').mouseover(function () {
  $('.col-sm-4').css("background-color", "yellow");
}).mouseout(function () {
    $('.col-sm-4').css("background-color", "red");
});

$('.col-sm-6').mouseover(function () {
  $('.col-sm-6').css("background-color", "blue");
}).mouseout(function () {
    $('.col-sm-6').css("background-color", "green");
});

/**
 * Filtros e imágenes
 */
$('#restaurantes').click(function(showrest) {
    $('.inicial').hide();
    $('.rest').show();
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['restaurant'],
  }, callback);
});

$('#pastelerias').click(function() {
    $('.inicial').hide();
    $('.rest').hide();
    $('.bake').show();
    $('.deli').hide();
    $('.take').hide();
    $('.cafe').hide();
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['bakery'],
  }, callback);
});

$('#delivery').click(function() {
    $('.inicial').hide();
    $('.rest').hide();
    $('.bake').hide();
    $('.deli').show();
    $('.take').hide();
    $('.cafe').hide();
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['meal_delivery'],
  }, callback);
});

$('#llevar').click(function() {
  $('.inicial').hide();
    $('.rest').hide();
    $('.bake').hide();
    $('.deli').hide();
    $('.take').show();
    $('.cafe').hide();
    service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['meal_takeaway'],
  }, callback);
});

$('#cafe').click(function() {
    $('.inicial').hide();
    $('.rest').hide();
    $('.bake').hide();
    $('.deli').hide();
    $('.take').hide();
    $('.cafe').show();
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
              infowindow.setContent($("#myModal").modal());
  });
} 

  }

  var funcionError = function (error) {
    alert("Tenemos problemas encontrando tu ubicación");
  }
  
  buscar();  
}

 