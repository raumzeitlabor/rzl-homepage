#!/bin/bash

sudo -u app npm install
sudo -u app PATH=./node_modules/.bin:$PATH bower install
sudo -u app grunt serve
