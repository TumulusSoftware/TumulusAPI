

# Web service modules
```
/asset/
/agreement/
/state/
/viewer/
/user/    

```

# Web service interface list
```
		get    /asset/list
		post   /asset/upload
		get    /asset/:assetId
post   /agreement/request
delete /agreement/:agreId
post   /agreement/agree
post   /agreement/reject
post   /agreement/announce
get    /agreement/byOwner
get    /agreement/byAnnouncer
get    /state/list
post   /state/:stateId
delete /state/:stateId
get    /view/byViewer
post   /view/assign
get    /view/list
get    /view/:authId
delete /view/:authId
post   /user/authenticate    
post   /user/register    
post   /user/verify    
get    /user/current    
get    /user/:id    
put    /user/:id    
```

# Interface Spec

## Upload asset

Add or replace an asset by uploading a file.

To add a new one, omit assetId or set it to 0.
To update an existing asset, define the assetId.

	post   /asset/upload

Request:

	Authorization header: bearer token
	Content-Type: multipart/form-data
	Form Data:
		assetId: (optional) <Integer>
		assetFile: (binary)
		tags: <String>

Response:

	{	"status":"OK|FAILED",
		"message":"message|empty"}



# Appendix: Existing web service interface as of Milestone 3

## asset

get     /asset/list
post    /asset/upload
get     /asset/:id/:fileName

## users

post    /users/authenticate    
post    /users/register    
post    /users/verify    
get     /users/allTx    
get     /users/    
get     /users/current    
get     /users/:id    
put     /users/:id    
delete  /users/:id    
