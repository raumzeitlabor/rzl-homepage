$(document).ready(function() {
    'use strict';

    var lsErr = 'Leider konnten keine Bilder geladen werden. Bitte versuch es später noch einmal.';

    var liOffset = 0;
    function lfnLoad() {
        $.ajax('/_tumblr/api/read/json?num=10&start=' + liOffset)
            .fail(function() {
                $('#tumblr p').empty().html(lsErr).addClass('bg-danger').show();
            })
            .done(function(d) {
                var lsHack = d.replace(/var \w+\s*=\s*/, '')
                    .replace(/;\s*$/, '');
    
                var loData;
                try {
                    loData = JSON.parse(lsHack);
                } catch(e) {
                    $('#tumblr p').empty().html(lsErr).addClass('bg-danger').show();
                    return;
                }
    
                console.log(loData);
                loData.posts.forEach(function(p) {
                    $('#tumblr p').remove();
                    if (p.photos && p.photos.length === 0 && p.hasOwnProperty('photo-url-250')) {
                        p.photos[0] = {
                            'photo-url-250': p['photo-url-250']
                        };
                    }
                        
                    for (var i = 0; p.photos && i < p.photos.length; i++) {
                        var loTmpl = $('#tumblr-tmpl').clone();
                        loTmpl.show().fadeIn();
                        loTmpl.append('<img src="' + p.photos[i]['photo-url-250'] + '"/>');
                        $('#tumblr').append(loTmpl);
                    }
                });

                liOffset += 10;
            });
    }

    var scrollListener = function () {
        $(window).one('scroll', function() {
            if ($(window).scrollTop() >= $(document).height() - $(window).height() - $('.rzl-footer').height()) {
                lfnLoad();
            }
            setTimeout(scrollListener, 200);
        });
    };

    scrollListener();
    lfnLoad();
});
