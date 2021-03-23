#/bin/bash

git add *

git commit -a -m "new build"

git push origin master

git subtree push --prefix build origin gh-pages