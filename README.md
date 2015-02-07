# rzl-homepage
[![Build Status](https://travis-ci.org/raumzeitlabor/rzl-homepage.svg?branch=master)](https://travis-ci.org/raumzeitlabor/rzl-homepage)
[![DevDependency Updates](https://david-dm.org/raumzeitlabor/rzl-homepage/dev-status.svg)](https://david-dm.org/raumzeitlabor/rzl-homepage#info=devDependencies&view=table)

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

## Development Setup

We have a Docker build container 'cause it's hip, but you may also roll your
own environment. Choose as you like.

### Docker

    cd docker && docker build -t rzl-homepage .
    docker run --privileged=true -p 127.0.0.1:8000:8000 -v $(pwd):/home/dev rzl-homepage

### Plain

#### Requirements

    sudo apt-get install nodejs npm jekyll
    sudo npm install -g grunt-cli bower

#### Dependencies

    npm install
    export PATH=$PATH:$(npm bin)
    bower install

#### Hacking

    grunt serve
    vi app/$file

#### Building

    grunt

## Deployment

This homepage is auto-deployed by Travis if the following requirements are met:

* we're on the master branch
* the build is green (grunt exited with status 0)

Travis will rsync the contents of the dist directory to premium (this is really
fast). Please note that it may take a few minutes until Travis is able to
complete a build.

## Internals

The data flow is as follows:

                                 app
                 app/_layouts     |
                        |         v
                        v      +--------+
                   .layouts -> | jekyll | -> .tmp -> dist
                               +--------+
The Gruntfile we're using was initially generated using the yeoman webapp
generator. While it allows for really nice development setups, it is a bit
complicated to understand. Here's some information on how the homepage is
built (rough sketch):

1. All JS code is linted. If you don't meet our style, you're out.
2. The target directory is cleaned up.
3. CSS is auto-prefixed (see e.g. http://scottriley.im/autoprefix).
4. All files relevant for Jekyll (especially HTML) is copied to .tmp
5. CSS and JS files are minified, concatenated and revved.
6. Images are optimized and revved.
7. Jekyll is run to generate the contents.
8. All HTML files are minified (e.g. templates, static pages).
