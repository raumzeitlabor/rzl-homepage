/* jshint camelcase: false */
/* global marked: false, moment: false */
(function() {
    'use strict';
    var errmsg = 'Leider ist unser Kalender im Moment nicht erreichbar. Bitte versuch es später noch einmal.';

    moment.locale('de');

    function errout() {
        $('#rzl-events').empty().append('<p>' + errmsg + '</p>');
    }

    var firstRun = true;
    var notCurrentmonth = false;
    var loadEvents; loadEvents = function() {
        if (firstRun) {
            firstRun = !firstRun;
        } else {
            $('#rzl-events').css('opacity', '0.3');
        }

        var month = moment().startOf('month');
        if (/\#\d{4}-\d{2}/.test(document.location.hash)) {
            var split = document.location.hash.substr(1).split('-');
            var trymonth = moment(split[0]+'-'+split[1]+'-01');
            if (trymonth.isValid()) {
                month = trymonth.startOf('month');
            }
            notCurrentmonth = true;
        }

        if (notCurrentmonth) {
            var monthStart = month.startOf('month').format('X');
        } else {
            var monthStart = moment().startOf('day').format('X');
        }
        var monthEnd = month.endOf('month').format('X');
        var prevMonth = month.subtract(1, 'months').format('YYYY-MM');
        var nextMonth = month.add(2, 'months').format('YYYY-MM');
        month.subtract(1, 'months');

        $.getJSON('/events/ical?accept=jcal&expand=true&start=' + monthStart + '&end=' + monthEnd, function(d) {
            var vevents = null;
            try {
                if (d.length < 3 || d[0] !== 'vcalendar') {
                    throw 'nope';
                }
                vevents = d[2];
            } catch(e) {
                errout();
                return;
            }

            $('#rzl-events').empty();
            $('#rzl-events').append('<h2>' + month.format('MMMM YYYY') + '</h2>');
            $($('#rzl-events-pager-tmpl').html()).appendTo('#rzl-events');

            var prevDate = null;
            var currentSide = 'right';

            // see https://tools.ietf.org/html/draft-ietf-jcardcal-jcal-10
            var orderMap = {};
            var ev;
            for (var i = 0; i < vevents.length; i++) {
                ev = {};
                var evdata = vevents[i];

                if (evdata[0] !== 'vevent') {
                    continue;
                }

                // lookup necessary data
                var necessary = ['dtstart', 'dtend', 'summary', 'description', 'location'];
                for (var j = 0; j < evdata[1].length; j++) {
                    var props = evdata[1][j];
                    if (necessary.indexOf(props[0]) !== -1) {
                        ev[props[0]] = props[3];
                    }
                }

                if (Object.keys(ev).length !== necessary.length) {
                    continue;
                }

                orderMap[ev.dtstart] = $.extend({}, ev);
            }

            var sortedEvs = Object.keys(orderMap).sort();
            for (i = 0; i < sortedEvs.length; i++) {
                ev = orderMap[sortedEvs[i]];
                var currDate = moment(ev.dtstart).format('YYYY-MM-DD');

                var c = $($('#rzl-event-tmpl').html());
                if (currDate !== prevDate){
                    c.find('.rzl-event-date time').append(moment(ev.dtstart).format('[<span>]DD[</span><span>]dd[</span>]'));
                    if (currDate == moment(new Date()).format('YYYY-MM-DD')){
                        c.find('.rzl-event-date').addClass('rzl-event-date-today');
                    }
                } else {
                    c.find('.rzl-event-date').remove();
                }

                if (moment().subtract(1, 'days') > moment(ev.dtstart)) {
                    c.find('.rzl-event-fromnow').append(moment(ev.dtstart).fromNow());
                } else {
                    // moment.js doesn't support moments without times and therefore
                    // provides no corresponding checks. Work around this by checking
                    // the length of the date string.
                    var hasStartTime = ev.dtstart.length > 10;
                    var hasEndTime = ev.dtend.length > 10;

                    var start = moment(ev.dtstart);
                    var end = moment(ev.dtend);
                    if (!hasEndTime) {
                        end.subtract(1, 'days');
                    }

                    var isMultiday = (start.day() !== end.day()) ||
                        (start.month() !== end.month()) ||
                        (start.year() !== end.year());

                    c.find('.rzl-event-fromnow').append(start.format('dddd, Do MMMM '));
                    if (isMultiday) {
                        if (hasStartTime) {
                            c.find('.rzl-event-fromnow').append(start.format(' HH:mm [Uhr] '));
                        } else {
                            c.find('.rzl-event-fromnow').append('ganztägig ');
                        }
                        c.find('.rzl-event-fromnow').append(end.format('[bis] dddd, Do MMMM '));
                        if (hasEndTime) {
                            c.find('.rzl-event-fromnow').append(end.format('HH:mm [Uhr]'));
                        } else {
                            c.find('.rzl-event-fromnow').append('ganztägig');
                        }
                    } else {
                        if (hasStartTime && hasEndTime) {
                            c.find('.rzl-event-fromnow').append(start.format('[von] HH:mm [Uhr] '));
                            c.find('.rzl-event-fromnow').append(end.format('[bis] HH:mm [Uhr]'));
                        } else if (hasStartTime) {
                            c.find('.rzl-event-fromnow').append(start.format('[ab] HH:mm [Uhr]'));
                        } else {
                            c.find('.rzl-event-fromnow').append('ganztägig');
                        }
                    }
                }

                c.find('.rzl-event-location').append(ev.location);

                c.find('.rzl-event-name').append(ev.summary);
                c.find('.rzl-event-descr').append(marked(ev.description.replace(/#/g, '###')));
                if (currDate !== prevDate){
                    currentSide = (currentSide === 'left') ? 'right' : 'left';
                }

                c.find('.rzl-event-' + currentSide).show();
                $('#rzl-events').append(c);

                prevDate = currDate;
            }
            
            if (sortedEvs.length < 1) {
                $('#rzl-events').empty().append('<p> keine weiteren Events in diesem Monat</p>');
            }

            $($('#rzl-events-pager-tmpl').html()).appendTo('#rzl-events');
            $('.pager .previous a').attr('href', '#' + prevMonth);
            $('.pager .next a').attr('href', '#' + nextMonth);

        }).fail(function() {
            errout();
            return;
        }).always(function() {
            $('#rzl-events').css('opacity', '1');
        });
    };

    $(document).on('ready', function() {
        loadEvents();
    });

    $(window).on('hashchange', function() {
        loadEvents();
        $('html,body').animate({scrollTop: $('#rzl-events').offset().top},'slow');
    });
})();
