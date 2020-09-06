/* globals L: false */
(function() {
    'use strict';
    L.Icon.Default.imagePath = '/bower_components/leaflet/dist/images';
    var map = L.map('rzl-map', {
        center: [49.507979, 8.499822],
        zoom: 17
    });

    map.on('click', function(e) {
        console.log('Lat, Lon: ' + e.latlng.lat + ', ' + e.latlng.lng);
    });

    var osmAttr = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmAttr,
        maxZoom: 17,
    }).addTo(map);

    var marker = L.marker([49.507476979789026, 8.520809412002563]).addTo(map);
    marker.bindPopup('<b>RaumZeitLabor</b><br>Weinheimer Strasse 58-60<br>68309 Mannheim').openPopup();
    var polyline = L.polyline([ ], {color: 'red'}).addTo(map);
    $(window).on('hashchange', function() {
        var stepHash = location.hash.replace('#', '');
        switch (stepHash) {
            default:
            case 'step1':
                marker.setLatLng([49.507476979789026, 8.520809412002563]).update();
                marker.bindPopup('<b>RaumZeitLabor</b><br>Weinheimer Strasse 58-60<br>68309 Mannheim').openPopup();
                polyline.setLatLngs([ ]);
                map.setView(marker.getLatLng(), 15);
                break;
            case 'step2':
                marker.setLatLng([49.5097829219898, 8.518245220184326]).update();
                marker.bindPopup('Haltestelle Käfertal Bahnhof').openPopup();
                polyline.setLatLngs([
                    [49.5097829219898, 8.518245220184326],
                    [49.508884244450805, 8.51716160774231],
                    [49.50773474911683, 8.517043590545654],
                    [49.50735157800333, 8.517011404037476],
                    [49.507525747063326, 8.520305156707764]
                    [49.507476979789026, 8.520777225494385]
                ]);
                map.fitBounds(polyline.getBounds());
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
