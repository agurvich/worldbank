#!/bin/bash
#bash clean.sh
rm -rf dist

npm run build:prod

rsync -avh --delete dist/ ../docs
cp ../media/* ../docs

git add ../docs
git commit
