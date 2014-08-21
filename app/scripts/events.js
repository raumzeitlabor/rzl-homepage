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

        var prevDate = null;
        var currentSide = 'left';
        d.data.forEach(function(ev, i) {
            var currDate = moment(ev.timeBegin);
            if (prevDate === null) {
                prevDate = currDate;
            }

            var c = $($('#rzl-event-tmpl').html());
            c.find('.rzl-event-date time').append(moment(ev.timeBegin).format('[<span>]DD[</span><span>]dd[</span>]'));

            if (moment().subtract(1, 'days') > moment(ev.timeBegin)) {
                c.find('.rzl-event-fromnow').append(moment(ev.timeBegin).fromNow());
            } else {
                c.find('.rzl-event-fromnow').append(moment(ev.timeBegin).format('dddd, Do MMMM [ab] hh:mm [Uhr]'));
            }

            c.find('.rzl-event-name').append(ev.name);
            c.find('.rzl-event-descr').append(marked(ev.description.replace(/#/g, '###')));

            if (currDate.date() !== prevDate.date()) {
                currentSide = (currentSide === 'left') ? 'right' : 'left';
            } else if (i > 0) {
                c.find('.rzl-event-date').hide();
            }

            c.find('.rzl-event-' + currentSide).show();
            $('#rzl-events').append(c);

            prevDate = currDate;
        });
    }).fail(function() {
        $('#rzl-events').empty().append('<h2>Fehler</h2><p>' + errmsg + '</p>');
        return;
    });
})();
