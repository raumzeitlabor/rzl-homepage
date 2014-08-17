# rzl-homepage CalDAV bridge

This is a small wrapper that connects to the given CalDAV server and returns
events for the given month. If no month is specified, defaults to the current
month. Response format is JSON.

This is used by our homepage to display calendar events, which will be fetched
with an AJAX request on /events (work in progress).

We're using PHP because CalDAV libs seem to be a rare species, and this one was
the best I could find. It was taken from the Davical project. To parse the iCal
responses, we're using sabre-vobject from the excellent sabre-dav project.

The Davical CalDAV lib is covered under the GPL, which we're using anyways.

## Contributing

Actually I have not tested this with a webserver setup, but instead executed
the file using the PHP interpreter. You may be able to do the same, depending
on the feature you're working on. Otherwise, please install a webserver.

### Requirements

    sudo apt-get install libawl-php radicale
    # install php-composer (unfortunately not in Debian repos)
    wget https://getcomposer.org/installer -O /tmp/composer-installer
    less /tmp/composer-installer    # make sure it's not installing a rootkit
    chmod +x /tmp/composer-installer
    php /tmp/composer-installer

### Building

    # install dependencies
    php composer.phar install
