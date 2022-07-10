# eventador
This package is used to give eventListeners more robust options while maintaining backwards compatibility. Meaning your program can have this added in and it will run smoothly. On top of that it makes removing eventListeners much easier because of guids assigned to each event. :) <br/>

## installation
To add eventador to a project you are able to install using:
```js
  npm install eventador
```
the other option is directly placing the src code into your project

## useage
make sure to import eventador when you plan on using it. This could be done in the index of your program. However I recommend it should be done in each module its used to allow access to Event.removeListener(id).

Here is a short example of use

```js
  //switching over to eventador should be easy since Its All The Same!
  import Eventador from "eventador";
  let idA;
  let idB;

  //this is the most basic way that it can be used
  idA = document.getElementById("id").addEventListener(event, callback, options);
  idB = window.addEventListener(event, callback, options);

  Eventador.removeListener(idA);
  Eventador.removeListener(idB);

  //These are the stranger ways
  idA = Eventador.addListener(event, callback, options, target);

  Eventador.removeListener(idA);

  //lets say you are using react then you can do inline events like this
  return (
    <div onClick={Eventador.makeCallback(callback, options)}>
      Click me!
    </div>
  );

  //lets say you were doing something in vanilla js then you could do inline like this:
  let callback = Eventador.makeCallBack(callback, options);
  <div onclick="callback">
    Click me!
  </div>
```

## 