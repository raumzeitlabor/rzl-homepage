# rzl-homepage
[![Build Status](https://travis-ci.org/raumzeitlabor/rzl-homepage.svg)](https://travis-ci.org/raumzeitlabor/rzl-homepage)
[![DevDependency Updates](https://david-dm.org/raumzeitlabor/rzl-homepage/dev-status.svg)](https://david-dm.org/raumzeitlabor/rzl-homepage#info=devDependencies&view=table)

To try out the new version, visit the [test installation](https://new.raumzeitlabor.de)
(updated automatically with each commit, checked every minute).

*This repository is rather large (about 200MB at the time of writing) because
everything (including images) is included. The initial cloning therefore takes
a few seconds (depending on your Internet connection).*

## Contributing

To contribute content or code please create a pull request, so that we can have a look
at it and discuss your changes. We integrate with Travis CI so that we can easily see
if your pull request breaks our build and thus cannot be merged.

When contributing blog posts you may of course automatically merge your pull request as
soon as Travis approves, if you follow our guidelines:

* Please provide a descriptive, short commit message. If more information is required,
put it into the body of the commit message. We speak English in our commit messages.
* Please use HTML on content pages sparingly. Blog posts should always be written in
Markdown if no special HTML content is required.
* Please set your editor to break after 85 characters and use spaces instead of tabs.

We will provide templates for creating blog posts. You will be able to add blog posts
consisting of text only on Github.

In case of questions, please talk to Else.

## Setup

### Requirements

    sudo apt-get install nodejs jekyll
    sudo npm install -g grunt-cli bower

### Dependencies

    npm install
    bower install

### Hacking

    grunt serve
    vi app/$file

### Building

    grunt

### Deploying

The quick and dirty solution is to add a `post-merge` git hook:

    #!/bin/bash -l
    set -e
    time npm update \
        && bower update \
        && ./node_modules/grunt-cli/bin/grunt \
        && rsync -vrP --checksum --delete dist/ dist.current

Note that the process of copying the files into the destination directory is
obviously not atomic. However, files are synced only if really necessary (based
on checksum). Deploying atomatically is anyways not possible due to AJAX
requests happening. Checking for new commits is done using crontab:

    */5 * * * * git pull origin master

A better solution would be to use Github web hooks. The effort of setting that
up is way higher though.
