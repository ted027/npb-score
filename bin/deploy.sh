#!bin/bash

YEAR="2021"

cd records_mod
python main_query.py
python main_calc.py
cd -
cp -rf records_mod/records/$YEAR/* webui/src/records/$YEAR
cp -rf webui/src/records/$YEAR/parks.json webui/src/records

git add --all
msg="update records by make `date`"
git commit -m "$msg"
git push origin master
