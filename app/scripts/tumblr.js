$(document).ready(function() {
    'use strict';

    var lsErr = 'Leider konnten keine Bilder geladen werden. Bitte versuch es später noch einmal.';

    var offset = 0;
    var buffer = [];
    var numberOfImages = 20;
    var totalWidth = 0.90 * $('#tumblr').innerWidth();

    function process(photos) {
        var dest = $('#tumblr');

        var border = 2;

        var rowIndex = 0;
        var currWidth = 0;

        var rowPics = [];
        var rowHeights = [];

        $.each(photos, function(i, v) {
            var rowHeight = 300;
            var w = v.width;
            var h = v.height;
            if (h !== rowHeight) {
                w = Math.floor(w * rowHeight / h);
            }

            if (! Array.isArray(rowPics[rowIndex])) {
                rowPics[rowIndex] = [];
            }

            rowPics[rowIndex].push(photos[i]);
            currWidth += w + 2 * border;

            if (currWidth > totalWidth || i === photos.length - 1) {
                // now arrange to fit width
                while (currWidth > totalWidth) {
                    rowHeight--;
                    currWidth = 0;
                    var numPics = rowPics[rowIndex].length;
                    for (var j = 0; j < numPics; j++) {
                        v = photos[i - (numPics - 1) + j];
                        w = v.width;
                        h = v.height;
                        if (h !== rowHeight) {
                            w = Math.floor(w * rowHeight / h);
                        }
                        currWidth += w;
                    }
                }
                rowHeights.push(rowHeight);
                currWidth = 0;
                rowIndex++;
            }
        });

        $.each(rowHeights, function(rowIndex, rowHeight) {
            var rowDiv = $('<div>', { class: 'tumblr-row' });
            $.each(rowPics[rowIndex], function(imgIndex, p) {
                var newWidth = Math.floor(p.width * rowHeight / p.height);
                var newHeight = rowHeight;
                var img = $('<img/>', {
                    src: p.thumb,
                    width: newWidth,
                    height: newHeight
                })
                .wrap('<a href="' + p.url + '" title="' + p.caption + '"></a>')
                .css('padding', border)
                .fadeIn();
                rowDiv.css('height', newHeight).append(img.parent()).appendTo(dest);
            });
            $.waypoints('refresh');
        });

        $.waypoints('refresh');
    }

    function getImages() {
        $('#loading').show();
        $.ajax('/_tumblr/api/read/json?num=' + numberOfImages + '&type=photo&start=' + offset)
            .fail(function() {
                $('#tumblr p').empty().html(lsErr).addClass('bg-danger').show();
            })
            .done(function(d) {
                // remove var tumblr_api = … and semicolon at end
                var lsHack = d.replace(/var \w+\s*=\s*/, '')
                    .replace(/;\s*$/, '');

                var data;
                try {
                    data = JSON.parse(lsHack);
                } catch(e) {
                    $('#tumblr > p').empty().html(lsErr).addClass('bg-danger').show();
                    return;
                }

                data = $.map(data.posts, function(p) {
                    if (p.photos && p.photos.length === 0 && p.hasOwnProperty('photo-url-250')) {
                        p.photos[0] = p;
                    }

                    return p.photos.map(function(d) {
                        return {
                            'thumb': d['photo-url-400'].replace(/^http:/, ''),
                            'url': d['photo-url-1280'].replace(/^http:/, ''),
                            'width': d.width,
                            'height': d.height,
                            'caption': d['photo-caption'] ? $(d['photo-caption']).text() : ''
                        };
                    });
                });

                // if last img row is incomplete, re-render
                var lastRowWidth = 0, numImgs = 0;
                $('div.tumblr-row').last().children().each(function() {
                    lastRowWidth += $(this).width();
                    numImgs++;
                });

                if (lastRowWidth < totalWidth * 0.95) {
                    $('div.tumblr-row').last().remove();
                    data = buffer.splice(-numImgs).concat(data);
                }

                process(data);

                // append to buffer
                buffer = buffer.concat(data);
                offset += numberOfImages;
            })
            .always(function() {
                $('#loading').hide();
            });
    }

    $('.rzl-footer').waypoint(function (direction) {
        if (direction === 'down') {
            getImages();
        }
    }, {
        offset: '95%',
    });

    var renderRelaxer = null;
    $(window).resize(function() {
        if (! renderRelaxer) {
            $('#tumblr').empty();
        } else {
            clearTimeout(renderRelaxer);
        }
        renderRelaxer = setTimeout(function() {
            renderRelaxer = null;
            process(buffer);
        }, 200);
    });
});
