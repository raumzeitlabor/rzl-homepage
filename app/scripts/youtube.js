/* global moment: false */
$(document).ready(function() {
    'use strict';

    var lsErr = 'Leider konnten keine Videos geladen werden. Bitte versuch es später noch einmal.';
    moment.locale('de');

    function render(v) {
        if (v.length === 0) {
            return;
        }

        // newest video is teasered
        var lsTime = moment(v[0].uploaded).format('LL');
        $('<h3 style="margin-top:0">' + v[0].title + '</h3><p><i class="glyphicon glyphicon-time"></i><span style="font-style: italic; color: #8e8e8e"> hochgeladen: ' + lsTime + '</span><p>' + v[0].description + '</p><p><em>weiter zu <a href="' + v[0].player.default + '">Youtube</a></em></p>')
            .appendTo('#youtube-main-descr');
        $('<iframe width="560" height="315" src="//www.youtube.com/embed/' + v[0].id + '?hd=1&autohide=1&showinfo=0" frameborder="0" allowfullscreen></iframe>')
            .appendTo('#youtube-main');

        if (v.length < 2) {
            return;
        }

        for (var i = 2; i < v.length; i++) {
            lsTime = moment(v[i].uploaded).format('LL');
            var row = $('<div class="row" style="margin:1.5em; margin-left: 0">');
            $('<div class="col-lg-4 col-md-4 col-sm-12 col-sx-12" id="youtube-item-thumb"><img src="' + v[i].thumbnail.hqDefault + '" /></div>')
                .appendTo(row);
            $('<div class="col-lg-8 col-md-8 col-sm-12 col-sx-12" id="youtube-item-descr"><h3 style="margin-top:0">' + v[i].title + '</h3><p><i class="glyphicon glyphicon-time"></i><span style="font-style: italic; color: #8e8e8e"> hochgeladen: ' + lsTime + '</span><p>' + v[i].description + '</p><p><em>weiter zu <a href="' + v[i].player.default + '">Youtube</a></em></p></div>')
                .appendTo(row);
            row.appendTo('#youtube-archive');
        }
    }

    $.ajax('//gdata.youtube.com/feeds/api/users/raumzeitlabor/uploads?v=2&alt=jsonc&max-results=11')
        .always(function() {
            $('#loading').hide();
        })
        .fail(function() {
            $('#youtube-hidden').empty().html(lsErr).addClass('bg-danger').show();
        })
        .done(function(d) {
            console.log(d);
            if (d.hasOwnProperty('error')) {
                $('#youtube-hidden').empty().html(lsErr).addClass('bg-danger').show();
                console.error('could not get JSONP from youtube API:', d);
                return;
            }
            $('#youtube-hidden').show();
            render(d.data.items);
        });
});
