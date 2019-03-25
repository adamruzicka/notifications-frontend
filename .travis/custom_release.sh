#!/bin/bash

# Taken from github.com/RedHatInsights/insights-dashboard
# at commit b91c8cd374d2e3c680c2d9226a87e2a103a0da75
# kudos to Kinlaw

set -e
set -x

# for now... push everywhere when master updates
if [ "${TRAVIS_BRANCH}" = "master" ]; then
    for env in ci qa prod
    do
        echo
        echo
        echo "PUSHING ${env}-beta"
        rm -rf ./dist/.git
        .travis/release.sh "${env}-beta"
    done
fi

if [ "${TRAVIS_BRANCH}" = "master-stable" ]; then
    for env in ci qa prod
    do
        echo
        echo
        echo "PUSHING ${env}-beta"
        rm -rf ./dist/.git
        .travis/release.sh "${env}-stable"
    done
fi
