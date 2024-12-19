#!/bin/bash
#bash clean.sh
rm -rf dist

npm run build:prod

rsync -avh --delete dist/ ../docs
cp ../wb-dd-presentation.pdf ../docs

git add ../docs
git commit
