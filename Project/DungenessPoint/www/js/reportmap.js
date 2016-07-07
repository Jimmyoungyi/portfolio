var geocoder;
var reportmap;
var infowindow;
var titlecontent;
var latg;
var lngg;
console.log("p")
function initialize() {
    var styles = [
        {"featureType":"water","elementType":"geometry","stylers":[{"color":"#a0d6d1"},{"lightness":0}]},
        {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#FAF6EC"},{"lightness":5}]},
        {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#dedede"},{"lightness":17}]},
        {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#dedede"},{"lightness":29},{"weight":0.2}]},
        {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":18}]},
        {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":16}]},
        {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#FAF6EC"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},
        {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000"},{"lightness":19}]},
        {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fff"},{"lightness":20}]},
        {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fff"},{"lightness":17},{"weight":1.2}]}
    ];
    var mapOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 10,
        center: {lat: 37.713588, lng: -122.379125},
    };
    geocoder = new google.maps.Geocoder();
    reportmap = new google.maps.Map(document.getElementById('reportmapcontent'),
        mapOptions);
    reportmap.setOptions({styles: styles});
    // Try HTML5 geolocation // new version geolocation is not working for http
    // console.log(navigator.geolocation);
    // if(navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         //console.log(pos,"g");
    //         codeLatLng(pos.lat,pos.lng,pos);
    //     }, function() {
    //         handleNoGeolocation(true);
    //     });
    // } else {
    //     // Browser doesn't support Geolocation
    //     handleNoGeolocation(false);
    // }
    var tppos = {
        lat: 37.713588,
        lng: -122.379125
    }
    codeLatLng(37.713588,-122.379125,tppos);
    //Map click event
    google.maps.event.addListener(reportmap, 'click', function(event) {
        placeMarker(event.latLng);
        console.log(event.latLng.lat())
    });
}
//Geolocation function
function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.'
    }
}
//Map click function
function placeMarker(location) {
    infowindow.setMap(null);
    codeLatLng(location.lat(),location.lng(),{lat:location.lat(),lng:location.lng()});
}
//title content call back
function codeLatLng(lat,lng,pos) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && results[1]) {
              reportmap.setZoom(10);
              titlecontent=results[1].formatted_address;
              infowindow = new google.maps.InfoWindow({
                map: reportmap,
                position: pos,
                content: titlecontent
            });
            //console.log(pos);
            reportmap.setCenter(pos);
            latg=lat;
            lngg=lng;
        }
    });
}

