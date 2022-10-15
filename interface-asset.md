# Web service: Asset
```
	post /asset/upload
	get  /asset/list
	get  /asset/:id
```
# Specs

## As the owner, upload a file as asset

	post /asset/upload

Request: form-data

	assetFile: the file
	tags: string

## As the owner, list all asset files

	get  /asset/list

## As the owner, download an asset by the asset ID

	get  /asset/:id

 