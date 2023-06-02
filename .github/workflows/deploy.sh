#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

echo "Preparing ~/.ssh..."
mkdir ~/.ssh
cp .github/workflows/known_hosts ~/.ssh
chmod 700 ~/.ssh ~/.ssh/*

echo "Preparing ssh agent..."
umask 0077
ssh-agent > ~/.ssh/env
. ~/.ssh/env

set +e
echo "$DEPLOY_OPENSSH_PRIVATE_KEY" | ssh-add -
result=$?
set -e
unset DEPLOY_OPENSSH_PRIVATE_KEY

ssh-add -l || true
if [ "$result" -ne 0 -o  $(ssh-add -l | wc -l) -lt 1 ] || ssh-add -l | grep -qF "The agent has no identities."; then
  echo "No ssh key loaded. Stopping deploy."
  echo "Only commits from https://github.com/raumzeitlabor/rzl-homepage/ have access to the keys."
  exit
fi

pull_number=$(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")

echo "Copying data..."
if [ -z "$pull_number" -o "$pull_number" = "null" ]; then
  echo "Deploying to https://raumzeitlabor.de/ ..."
  rsync -zvrt --omit-dir-times --delete --checksum -e "ssh -o VerifyHostKeyDNS=yes" --progress dist/ deploy@apfelkirsch.raumzeitlabor.de:/var/lib/www/www.raumzeitlabor.de
else
  echo "Deploying to https://pr-$pull_number.rzl-homepage.raumzeitlabor.org/ ..."
  ssh -o VerifyHostKeyDNS=yes deploy@apfelkirsch.raumzeitlabor.de mkdir /var/lib/www/www.raumzeitlabor.de-preview/pr-$pull_number
  rsync -zvrt --omit-dir-times --delete --checksum -e "ssh -o VerifyHostKeyDNS=yes" --progress dist/ deploy@apfelkirsch.raumzeitlabor.de:/var/lib/www/www.raumzeitlabor.de-preview/pr-$pull_number
  echo "You can now see your build at https://pr-$pull_number.rzl-homepage.raumzeitlabor.org/"
fi


