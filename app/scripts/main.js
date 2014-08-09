(function() {
    'use strict';
    $.getJSON('http://s.rzl.so/api/simple.json', function(d) {
        if (d === 1) {
            $('#rzl-status').show();
            $('.raumstatus').removeClass('label-warning label-error').addClass('label-success').empty().append('offen');
        } else if (d === 0) {
            $('#rzl-status').hide();
            $('.raumstatus').removeClass('label-warning label-error').addClass('label-error').empty().append('geschlossen');
        } else {
            $('#rzl-status').hide();
            $('.raumstatus').removeClass('label-success label-error').addClass('label-warning').empty().append('unbekannt');
        }
    })
    .fail(function() {
        $('.raumstatus').removeClass('label-success label-error').addClass('label-warning').empty().append('unbekannt');
    });
})();
