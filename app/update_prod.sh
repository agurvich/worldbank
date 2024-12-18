#!/bin/bash
#bash clean.sh
rm -rf dist

npm run build:prod

rsync -avh --delete dist/ copan:/svs/db/prepub/abg/svs-reporter