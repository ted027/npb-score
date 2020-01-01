#!bin/bash

cd records_mod
python main.py
cd -
cp -rf records_mod/records/2019 webui/src/2019

git add --all
msg="update records by make `date`"
git commit -m "$msg"
git push origin master