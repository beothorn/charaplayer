git add -A
git commit -m"Preparing to publish"
git push
git checkout gh-pages
git merge master
git push
git checkout master
