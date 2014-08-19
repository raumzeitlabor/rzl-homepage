/* jshint camelcase: false */
/* global marked: false, moment: false */
(function() {
    'use strict';
    var errmsg = 'Leider ist unser Kalender im Moment nicht erreichbar. Bitte versuch es später noch einmal.';

    moment.locale('de');
    $.getJSON('/events/api', function(d) {
        if (d.status !== 'OK') {
            $('#rzl-events').empty().append('<h2>Fehler</h2><p>' + errmsg + '</p>');
            return;
        }

        $('#rzl-events').prepend('<h1>' + moment(d.month, 'MM-YYYY').format('MMMM YYYY') + '</h1>');

        d.data.forEach(function(ev, i) {
            var c = $($('#rzl-event-tmpl').html());
            c.find('.rzl-event-date time').append(moment(ev.timeBegin).format('[<span>]DD[</span><span>]dd[</span>]'));
            c.find('.rzl-event-name').append(ev.name);
            c.find('.rzl-event-descr').append(marked(ev.description.replace(/#/g, '###')));
            if (i % 2 === 0) {
                c.find('.rzl-event-left').show();
            } else {
                c.find('.rzl-event-right').show();
            }
            $('#rzl-events').append(c);
        });
    }).fail(function() {
        $('#rzl-events').empty().append('<h2>Fehler</h2><p>' + errmsg + '</p>');
        return;
    });
})();
