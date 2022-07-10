import Eventador from "../modules/Eventador.js";

EventTarget.prototype.eventadorAddEventListener = EventTarget.prototype.addEventListener;

EventTarget.prototype.eventadorRemoveEventListener = EventTarget.prototype.removeEventListener;

//these are only to filter to eventador
EventTarget.prototype.removeEventListener = function(event, callback, options) {
    return this.eventadorRemoveEventListener(event, callback, options);
}

EventTarget.prototype.addEventListener = function(event, callback, options) {
    let failedEvent = event;
    let failedCallback = callback;
    let failedOptions = options;

    try {
        //this if statment is for handling events directly attached to the HTMLEvent rather then made through eventador.
        //it looks like this issue does not exist in vanilla js. which implys that programs that do not use a virtual dom
        //wont have this issue. However this is obviously a lazy solution. as a result. the event name was given an
        //name unique to eventador when it was made in eventador. If it fails to have that name it will be assumed that the event should be handled
        //normally. This may be the cause of breakage for other frameworks
        //a react event
        if (/react-/.test(event)) {
            return this.eventadorAddEventListener(event, callback, options, this);
        }

        return Eventador.addListener(event, callback, options);
    } catch (e) {
        return this.eventadorAddEventListener(failedEvent, failedCallback, failedOptions);
    }
}