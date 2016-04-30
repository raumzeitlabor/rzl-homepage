$(document).ready(function() {
    'use strict';

    var lsErr = 'Leider konnten keine Bilder geladen werden. Bitte versuch es später noch einmal.';

    var offset = 0;
    var buffer = [];
    var numberOfImages = 20;

    function process(photos) {
        var totalWidth = 0.90 * $('#tumblr').innerWidth();
        var dest = $('#tumblr');

        var border = 2;

        var rowIndex = 0;
        var currWidth = 0;

        var rowPics = [];
        var rowHeights = [];
        var rowHeight = 300;

        for (var i = 0; i < photos.length; i++) {
            var v = photos[i];
            rowHeight = 300;
            var h = v.height;
            var w = v.width;
            if (h >= rowHeight) {
                w = Math.floor(w * rowHeight / h);
                h = rowHeight;
            }

            if (! Array.isArray(rowPics[rowIndex])) {
                rowPics[rowIndex] = [];
            }

            rowPics[rowIndex].push(photos[i]);
            currWidth += w + 2 * border;

            console.log('totalwidth=', totalWidth, ', currWidth=', currWidth);
            if (currWidth >= totalWidth || i === photos.length - 1) {
                console.log('i=', i, ', new row: ', rowIndex);
                // now arrange to fit width
                while (currWidth >= totalWidth * 0.90) {
                    rowHeight--;
                    currWidth = 0;
                    var numPics = rowPics[rowIndex].length;
                    for (var j = 0; j < numPics; j++) {
                        v = photos[i - (numPics - 1) + j];
                        h = rowHeight;
                        w = Math.floor(v.width * rowHeight / v.height);
                        currWidth += w + 2 * border;
                    }
                }
                console.log('totalwidth=', totalWidth, ', newWidth=', currWidth, ', rowHeight=', rowHeight, ', numImages=', i+1);
                rowHeights.push(rowHeight);
                currWidth = 0;
                rowIndex++;
            }
        }

        for (rowIndex = 0; rowIndex < rowHeights.length; rowIndex++) {
            rowHeight = rowHeights[rowIndex];
            var rowDiv = $('<div>', { class: 'tumblr-row' });
            for (var imgIndex = 0; imgIndex < rowPics[rowIndex].length; imgIndex++) {
                var p = rowPics[rowIndex][imgIndex];
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
            }
            $.waypoints('refresh');
        }
    }

    function getImages() {
        $('#loading').show();
        var totalWidth = 0.90 * $('#tumblr').innerWidth();
        $.getJSON('//api.tumblr.com/v2/blog/log.raumzeitlabor.org/posts/photo?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&callback=?&limit=' + numberOfImages + '&offset=' + offset)
            .fail(function() {
                $('#tumblr p').empty().html(lsErr).addClass('bg-danger').show();
            })
            .done(function(data) {
                data = $.map(data.response.posts, function(p) {
                    return p.photos.map(function(d) {
                        /* jshint camelcase: false */
                        return {
                            'thumb': d.alt_sizes[1].url,
                            'url': d.alt_sizes[0].url,
                            'width': d.original_size.width,
                            'height': d.original_size.height,
                            'caption': d.caption ? $(d.caption).text() : ''
                        };
                        /* jshint camelcase: false */
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
