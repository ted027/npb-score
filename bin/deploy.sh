#!bin/bash

cd records_mod
python main.py
cd -
cp -rf records_mod/records webui/src

git add --all
msg="update records by make `date`"
git commit -m "$msg"
git push origin master