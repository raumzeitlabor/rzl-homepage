(function() {
    'use strict';
    $.getJSON('//status.raumzeitlabor.de/api/simple.json', function(d) {
        if (d === 1) {
            $('#rzl-status').show();
            $('.raumstatus').removeClass('label-warning label-danger').addClass('label-success').empty().append('offen');
        } else if (d === 0) {
            $('#rzl-status').hide();
            $('.raumstatus').removeClass('label-warning label-danger').addClass('label-danger').empty().append('geschlossen');
        } else {
            $('#rzl-status').hide();
            $('.raumstatus').removeClass('label-success label-danger').addClass('label-warning').empty().append('unbekannt');
        }
    })
    .fail(function() {
        $('.raumstatus').removeClass('label-success label-danger').addClass('label-warning').empty().append('unbekannt');
    });
})();
