# Husky Fileserver

This a very simple file server, designed for use with husky-fs-driver on the Husky source code editor.

__Warning__  
This server provides __no__ authentication mechanism, at all. Ensure you secure it using your own secure method.

## API

__Reading a file__  

```
Syntax: GET /fs/:uri/read
Return:

On success, JSON encoded object, HTTP status 200

Example:
{
	buffer: (filebuffer)
}

Directory example:
{
	fileList: [
    	{
        	type: "file",
            directory: "/tmp",
            name: "test.c",
            size: 4096,
            lastModified: (Date object)
            createdOn: (Date object)
        }
    ]
}

On failure, JSON encoded object, HTTP status 404 || 403

Example:
{
	system: "File not found"
}
```

__Writing a file__  
```
Syntax: POST /fs/write
Post data: uri, buffer
Return:

On success, JSON encoded object, HTTP status 200

Example:
{
	system: "File written"
}

On failure, JSON encoded object, HTTP status 403 || 400
Example:
{
	system: "Could not write file"
}

{
	system: "The file you treid to write is a directory"
}
```