var historymap;
var markers=[];
var infos=[];
function historymapinitialize() {
  var centerPos = new google.maps.LatLng(37.774929, -122.419416);
  var halfMoonBayPier = new google.maps.LatLng(37.503429, -122.481906);
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
  {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fff"},{"lightness":17},{"weight":1.2}]}];
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 10,
    center: centerPos,
  };
  historymap = new google.maps.Map(document.getElementById('historymapcontent'),
    mapOptions);
  
  historymap.setOptions({styles: styles});
}
function addhistorypoint(){
  for(var i=0;i<title.length;i++){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat[i], lng[i]),
      map:historymap,
      title: title[i]
    });
    markers[i]=marker;

    // var infoWindow = new google.maps.InfoWindow({
    //   content: db[i].infoWindow
    // });
    // infos[i]=infoWindow;
    // google.maps.event.addListener(markers[i], 'click', function() {
    //   infos[i].open(map,markers[i]);
    // });
    console.log(markers[i])
  }
}