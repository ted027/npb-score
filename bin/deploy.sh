#!bin/bash

YEAR="2020"

cd records_mod
python main.py
cd -
cp -rf records_mod/records/$YEAR webui/src/records/$YEAR

git add --all
msg="update records by make `date`"
git commit -m "$msg"
git push origin master
