/* globals L: false */
(function() {
    'use strict';
    var map = L.map('rzl-map', {
        center: [49.507979, 8.499822],
        zoom: 17
    });

    map.on('click', function(e) {
        console.log('Lat, Lon: ' + e.latlng.lat + ', ' + e.latlng.lng);
    });

    var osmAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmAttr,
        maxZoom: 17,
    }).addTo(map);

    var marker = L.marker([49.50526, 8.502]).addTo(map);
    $(window).on('hashchange', function() {
        var stepHash = location.hash.replace('#', '');
        switch (stepHash) {
            default:
            case 'step1':
                marker.setLatLng([49.505370187170236, 8.50215196609497]).update();
                map.setView(marker.getLatLng(), 15);
                break;
            case 'step2':
                marker.setLatLng([49.505370187170236, 8.50215196609497]).update();
                map.setView(marker.getLatLng(), 17);
                break;
            case 'step3':
                marker.setLatLng([49.50734182456017, 8.499072790145874]).update();
                map.setView(marker.getLatLng(), 17);
                $('#step5-prev').attr('href', '#step3');
                break;
            case 'step4':
                marker.setLatLng([49.50810816393884, 8.500746488571167]).update();
                map.setView(marker.getLatLng(), 17);
                $('#step5-prev').attr('href', '#step4');
                break;
            case 'step5':
                marker.setLatLng([49.50804546389515, 8.499341011047363]).update();
                map.setView(marker.getLatLng(), 17);
                break;
        }

        if (stepHash.length === 0) {
            return;
        } else if ($('.stepdescr#' + stepHash).length === 0) {
            return;
        }

        $('.stepdescr').hide();
        $('.stepdescr#' + stepHash).show();
    }).trigger('hashchange');
})();
