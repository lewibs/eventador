# eventador
This package is used to give eventListeners more robust options while maintaining backwards compatibility. Meaning your program can have this added in and it will run smoothly. On top of that it makes removing eventListeners much easier because of guids assigned to each event. :) <br/>

# usage
To add eventador to a project you are able to install using:
```js
  npm install eventador
```
make sure to import eventador when you plan on using it. This could be done in the index of your program. However I recommend it should be done in each module its used to allow access to Event.removeListener(id)
```js
  document.getElementById("id").addEventListener(event, callback, options, target)
```

switching over to eventador should be easy since Its All The Same! Here are some examples on how to use addEventListener:
```js
  

```
