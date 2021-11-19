#!/bin/sh

echo "Preparing ~/.ssh..."
mkdir ~/.ssh
cp .github/workflows/known_hosts ~/.ssh
chmod 700 ~/.ssh ~/.ssh/*

echo "Preparing ssh agent..."
umask 0077
ssh-agent > ~/.ssh/env
. ~/.ssh/env
echo "$DEPLOY_OPENSSH_PRIVATE_KEY" | ssh-add -
unset DEPLOY_OPENSSH_PRIVATE_KEY
ssh-add -l

echo "Copying data..."
rsync -zvrt --omit-dir-times --delete --checksum -e "ssh -4 -p 36270" --progress dist/ deploy@premium-ng.raumzeitlabor.de:/var/lib/www/www.raumzeitlabor.de

