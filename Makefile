record:
	cd records_mod
	python main.py
	cd -
	cp -rf records_mod/records webui/src

push:
	git add --all
	msg="update records by make `date`"
	git commit -m "$msg"
	git push origin master

deploy: record push
