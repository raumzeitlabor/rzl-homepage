#!/bin/bash

set -e

if [ -z "$DEVUID" ]; then
    echo "Please specify the UID of your user (-e DEVUID=\$(id -u))."; exit 1;
fi

adduser --uid $DEVUID --disabled-password --gecos "" dev

cd /home/dev

grep -sqE 'github\.com.raumzeitlabor/rzl-homepage' .git/config || { \
    echo -e "\nDid you mount the rzl-homepage repository root?\n"; exit 1; \
}

sudo -u dev -s -- <<EOF
npm install
export PATH=./node_modules/.bin:$PATH
bower install
bundle install --path vendor/bundle
grunt "$@"
EOF
