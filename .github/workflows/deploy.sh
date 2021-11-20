#!/bin/bash

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
if [ $(ssh-add -l | wc -l) -lt 1 ]; then
  echo "No ssh key loaded. Stopping deploy."
  exit
fi

pull_number=$(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")

echo "Copying data..."
if [ -z "$pull_number" -o "$pull_number" = "null" ]; then
  echo "Deploying to https://raumzeitlabor.de/ ..."
  rsync -zvrt --omit-dir-times --delete --checksum -e "ssh -4 -p 36270" --progress dist/ deploy@premium-ng.raumzeitlabor.de:/var/lib/www/www.raumzeitlabor.de
else
  echo "Deploying to https://pr-$pull_number.rzl-homepage.raumzeitlabor.org/ ..."
  ssh ssh -4 -p 36270 deploy@premium-ng.raumzeitlabor.de mkdir /var/lib/www/www.raumzeitlabor.de-preview/pr-$pull_number
  rsync -zvrt --omit-dir-times --delete --checksum -e "ssh -4 -p 36270" --progress dist/ deploy@premium-ng.raumzeitlabor.de:/var/lib/www/www.raumzeitlabor.de-preview/pr-$pull_number
  echo "You can now see your build at https://pr-$pull_number.rzl-homepage.raumzeitlabor.org/"
fi


