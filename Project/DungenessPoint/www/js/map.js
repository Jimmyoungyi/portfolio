var geocoder;
var reportmap;
var infowindow;
var titlecontent;
function initialize() {
  var mapOptions = {
    zoom: 15
  };
  geocoder = new google.maps.Geocoder();
  reportmap = new google.maps.Map(document.getElementById('reportmapcontent'),
      mapOptions);
  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      codeLatLng(pos.k,pos.D,pos);

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  //Map click event
  google.maps.event.addListener(reportmap, 'click', function(event) {
    placeMarker(event.latLng);
  });
}
//Geolocation function
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.'
  }
  var options = {
    map: reportmap,
    position: new google.maps.LatLng(60, 105),
    content: content
  };
  infowindow = new google.maps.InfoWindow(options);
  reportmap.setCenter(options.position);
}
//Map click function
function placeMarker(location) {
  infowindow.setMap(null);
  codeLatLng(location.k,location.D,location);
}
//title content call back
function codeLatLng(lat,lng,pos) {
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK && results[1]) {
      reportmap.setZoom(15);
      titlecontent=results[1].formatted_address;
      infowindow = new google.maps.InfoWindow({
        map: reportmap,
        position: pos,
        content: titlecontent
      });
      reportmap.setCenter(pos);
      console.log(titlecontent,lat,lng);
    }
  });
}