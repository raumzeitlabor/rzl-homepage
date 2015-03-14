$(document).ready(function() {
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

    function getAndSetVersion() {
        var msg = 'ENOVERSION';
        $.getJSON('/CHANGELOG.json')
            .success(function(d) {
                if (d !== 'GIT_VERSION_INFO') {
                    msg = d;
                }
            })
            .always(function() {
                msg = msg.split('-');
                if (msg.length > 1) {
                    msg[1] = '-' + msg[1];
                } else {
                    msg.push('');
                }
                $('#git-rev').empty().append('<a style="color:inherit;text-decoration:none" href="' + msg[0] + '">' + msg[0] + '</a>' + msg[1]);
            });
    }

    $('.rzl-footer').waypoint(function() {
        getAndSetVersion();
    }, {
        triggerOnce: true,
        offset: '95%',
    });
    $.waypoints('refresh');
});
