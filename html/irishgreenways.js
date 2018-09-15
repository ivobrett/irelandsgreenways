  var map;
  var initialLat = 53.3029981;
  var initialLng = -8.2547665;
  // This is the minimum zoom level that we'll allow
  var minZoomLevel = 7;

  var windowWidth = jQuery(window).width();
  if(windowWidth <=768){
    zoomLevel = 6;
  } else {
    zoomLevel = 7;
  }

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(53.4438, -7.899),
      zoom: zoomLevel,
      styles: mapStyle,
      mapTypeId: 'terrain'
    });

    var overlay = new google.maps.OverlayView();
    overlay.draw = function() {};
    overlay.setMap(map); // 'map' is new google.maps.Map(...)

    // var ctaLayer = new google.maps.KmlLayer({
    //   url: 'https://web.archive.org/web/20171027191026/http://irishgreenways.prosites365.com/downloads/irish_greenways.kml',
    //   // url: 'https://web.archive.org/web/20171027191026/https://developers.google.com/maps/documentation/javascript/tutorials/westcampus.kml',
    //   map: map
    // });

    map.data.loadGeoJson('https://ivobrett.github.io/irelandsgreenways/html/irishgreenways.json');

    map.data.setStyle(function (feature) {
        var strokeColor = feature.getProperty('strokeColor');
        return {
            strokeColor: strokeColor,
            strokeWeight: 2
        };
    });

    map.data.addListener('click', function(event) {
      location.href = "/index.php/page/"+ event.feature.getProperty('link');
    });
    map.data.addListener('mouseover', function(event) {

      jQuery('#greenway-parent').offset({ top: event.pageX , left: event.pageY});
      map.data.revertStyle();
      map.data.overrideStyle(event.feature, {strokeWeight: 8});
      jQuery('#greenway-parent').removeClass('hide-div');
      jQuery('#greenway-name').html(event.feature.getProperty('name'));
    });
    map.data.addListener('mouseout', function(event) {
      map.data.revertStyle();
      jQuery('#greenway-parent').addClass('hide-div');
    });



  	// map.setCenter({
  	// 	lat : initialLat,
  	// 	lng : initialLng
  	// });
    // bounds of the desired area
   // Bounds for North America
   var strictBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(52, -10), 
     new google.maps.LatLng(57, -6)
   );

   // Listen for the CENTER_CHANGED event
       
   google.maps.event.addListener(map, 'center_changed', function() {
     if (strictBounds.contains(map.getCenter())) return;

     // We're out of bounds - Move the map back within the bounds

     var c = map.getCenter(),
         x = c.lng(),
         y = c.lat(),
         maxX = strictBounds.getNorthEast().lng(),
         maxY = strictBounds.getNorthEast().lat(),
         minX = strictBounds.getSouthWest().lng(),
         minY = strictBounds.getSouthWest().lat();

     if (x < minX) x = minX;
     if (x > maxX) x = maxX;
     if (y < minY) y = minY;
     if (y > maxY) y = maxY;

     //Removed the rebounding box as it causes problems on zoom and mobile.
     // map.setCenter(new google.maps.LatLng(y, x));
   });

   // Limit the zoom level
   google.maps.event.addListener(map, 'zoom_changed', function() {
       //Do not adjust zoom
     // if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
   });

   var gFeatureHeight = jQuery("#g-feature").height();
   var gNavigationHeight = jQuery("#g-navigation").height();
   var windowHeight = jQuery(window).height();
   var drawMapToo = windowHeight - gFeatureHeight - gNavigationHeight;

   jQuery('#container-map').css("min-height", drawMapToo + "px" );

  }//END MAP

  var mapStyle = [{
        'featureType': 'all',
        'elementType': 'all',
        'stylers': [{'visibility': 'on'}]
      }, {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
      }, {
        'featureType': 'water',
        'elementType': 'labels',
        'stylers': [{'visibility': 'off'}]
      }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'hue': '#5f94ff'}, {'lightness': 60}]
      }];
jQuery( window ).resize(function() {
 var gFeatureHeight = jQuery("#g-feature").height();
 var gNavigationHeight = jQuery("#g-navigation").height();
 var windowHeight = jQuery(window).height();
 var drawMapToo = windowHeight - gFeatureHeight - gNavigationHeight;
 jQuery('#container-map').css("min-height", drawMapToo + "px" );
});
