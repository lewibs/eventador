# eventador
This package is used to give eventListeners more robust options. On top of that it makes removing eventListeners much easier because of the guids assigned to each event. :) <br/>

<p align="center">
  <img src="https://github.com/lewibs/eventador/blob/main/images/eventador.png?raw=true" />
</p>

## installation
To add eventador to a project you are able to install using:
```js
  npm install eventador
```
the other option is directly placing the src code into your project

## useage
Make sure to import eventador when you plan on using it. This could be done in the index of your program. However I recommend it should be done in each module its used to allow access to Event.removeListener(id).

Here is a short example of use

```js
  //switching over to eventador should be easy since It's All The Same!
  import Eventador from "eventador";
  let idA;
  let idB;

  //this is the most basic way that it can be used
  idA = document.getElementById("id").eventadorListener(event, callback, options);
  idB = window.eventadorListener(event, callback, options);

  Eventador.removeListener(idA);
  Eventador.removeListener(idB);

  //These are the stranger ways
  idA = Eventador.addListener(target,event, callback, options);

  Eventador.removeListener(idA);

  //lets say you are using react then you can do inline events like this
  return (
    <div onClick={Eventador.makeCallback(callback, options)}>
      Click me!
    </div>
  );

  //let's say you were doing something in vanilla js then you could do inline like this:
  let callback = Eventador.makeCallBack(callback, options);
  <div onclick="callback">
    Click me!
  </div>
```

## arguments
All of the protos use 2 or more of these parameters:

### event : string
the events are pretty standard js events as in depth documentation can be sound here:
https://developer.mozilla.org/en-US/docs/Web/API/Event/type

### callback : function(Event)
The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs. This must be null, an object with a handleEvent() method, or a JavaScript function. This is able to be any type of function. It should expect one argument to be passed in which is an Event:
https://developer.mozilla.org/en-US/docs/Web/API/Event

### options : object{ capture, once, passive, signal, keys, pressAll, max }
This is the meat of eventador. It is a list of options that you can attach to a listener. The important thing to note is that there are a few events which are maintained from the old code. These include capture, once, passive, and signal.
The reason why this was done was so that the program could have backwards compatibility while still including new options.

#### capture : bool default false
A boolean value indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. If not specified, defaults to false.

#### once : bool default false
A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked. If not specified, defaults to false.

#### passive : bool default false
A boolean value that, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning. If not specified, defaults to false – except that in browsers other than Safari and Internet Explorer, defaults to true for the wheel, mousewheel, touchstart and touchmove events. See Improving scrolling performance with passive listeners to learn more.

#### signal : AbortSignal default undefined
An AbortSignal. The listener will be removed when the given AbortSignal object's abort() method is called. If not specified, no AbortSignal is associated with the listener.

#### keys : [string]
This is an array of keys. They follow all the standard key names defined in js documentation. However, it also includes the added options from the keylogger used: https://github.com/lewibs/keylogger

#### pressAll : bool default false
This is a boolean that describes the relationship between the keys. If it is false then the keys are treated as "or" conditionals. If it is true then it is an "and" relationship and all keys must be pressed.

#### max : integer default false
This is an integer (or boolean false) to describe the maximum number of times that the event can be called. If it is false eventador assumes there is no limit to the number of times the event can be called. If it is an integer then that determines the number of times that the event will be called.

### target : EventTarget default window
this is the target that the function will be acting on. If it is not given then the event is set as a global event.

### id : string
this is the id that is attached to an event. It is a guid string that can be used to remove the listener.


## functionality
These are the primary functions that can be used in Eventador knowingly. Unlike the prototypes with which the user is unaware of their input being filtered. On top of that it can be imported as an individual function rather than attached as a static to the Eventador class.

### Eventador.addListener(event, callback, options, target) returns id
This is similar to EventTarget.prototype.addEventListener. The only difference is that it defaults to window.

### Eventador.removeListener(id) returns bool
This is used to remove an event from the program. If a valid guid is passed into the id the event will be removed and a true will be returned if it was a success.

### Eventador.makeCallback(callback, options) returns function
This is used with the ONLY intention of being added inline to an HTMLElement. It takes the callback and options, then based on the Event passed in it determines the event and also target thus making eventador able to be used in large scale frameworks such as react.

## prototypes
These are the chained prototypes that make this software so sexy. This stuff gets seamlessly added into the program and you don't even notice it.

### EventTarget.prototype.addEventListener(event, callback, options) returns id
This is not the same prototype that can be found in https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
What it is, is a chain that modifies input and handles options before passing it to the real event listener which can be found in
EventTarget.prototype.eventadorClassicAddEventListener, which was named like that in order to avoid prototype conflict.
The id which is returned can be used later to identify the event or remove it from the target.

### EventTarget.prototype.removeEventListener(event, callback, options) returns id
This is not the same prototype that can be found in https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
What it is, is a chain that modifies input and handles options before passing it to the real event listener which can be found in
EventTarget.prototype.eventadorClassicRemoveEventListener, which was named like that in order to avoid prototype conflict.
The id which is returned can be used later to identify the event or remove it from the target.


## sources
I personally believe that the best developers are the ones who choose to read documentation over stack overflow. Which is why I am linking the documents that I spent a good amount of time reading. On top of that, calling things like EventTarget is really useful to help understand the nitty gritty.

https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener <br/>
https://developer.mozilla.org/en-US/docs/Web/API/Event <br/>
https://developer.mozilla.org/en-US/docs/Web/API/Event/type <br/>
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement <br/>


