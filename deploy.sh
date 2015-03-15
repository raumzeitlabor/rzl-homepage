#!/bin/bash
set -e

# Sync the contents of this directory where the site should have been built
SOURCE_DIR=dist
# Where to copy files
TARGET_DIR=/var/www/www.raumzeitlabor.de/htdocs

if [ ! -d "$SOURCE_DIR" ]; then
  echo "SOURCE_DIR ($SOURCE_DIR) does not exist, build the source directory before deploying"
  exit 1
fi

if [ -n "$TRAVIS_BUILD_ID" ]; then
  # Set the following environment variables in the travis configuration (.travis.yml)
  #
  #   DEPLOY_BRANCH    - The only branch that Travis should deploy from
  #   ENCRYPTION_LABEL - The label assigned when encrypting the SSH key using travis encrypt-file
  #
  echo DEPLOY_BRANCH: $DEPLOY_BRANCH
  echo ENCRYPTION_LABEL: $ENCRYPTION_LABEL
  if [ "$TRAVIS_BRANCH" != "$DEPLOY_BRANCH" ]; then
    echo "Travis should only deploy from the DEPLOY_BRANCH ($DEPLOY_BRANCH) branch"
    exit 0
  else
    if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
      echo "Travis should not deploy from pull requests"
      exit 0
    else
      ENCRYPTED_KEY_VAR=encrypted_${ENCRYPTION_LABEL}_key
      ENCRYPTED_IV_VAR=encrypted_${ENCRYPTION_LABEL}_iv
      ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
      ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}

      # The `deploy_key.enc` file should have been added to the repo and should
      # have been created from the deploy private key using `travis encrypt-file`
      openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d

      chmod 600 deploy_key
      eval `ssh-agent -s`
      ssh-add deploy_key
    fi
  fi
fi

rsync -zvrt --omit-dir-times --delete --checksum -e ssh $SOURCE_DIR/ deploy@rzl-homepage.docker.raumzeitlabor.de:/data
