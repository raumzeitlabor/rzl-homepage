#!/bin/bash

cd /home/dev

grep -sq 'github.com/raumzeitlabor/rzl-homepage' .git/config || { \
    echo -e "\nDid you mount the rzl-homepage repository root?\n"; exit 1; \
}

sudo -u dev -s -- <<EOF
npm install
export PATH=./node_modules/.bin:$PATH
bower install
grunt serve
EOF
