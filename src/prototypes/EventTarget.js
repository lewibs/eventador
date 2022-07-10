import Eventador from "../modules/Eventador.js";

EventTarget.prototype.eventadorAddEventListener = EventTarget.prototype.addEventListener;

EventTarget.prototype.eventadorRemoveEventListener = EventTarget.prototype.removeEventListener;

//these are only to filter to eventador
EventTarget.prototype.removeEventListener = function(event, dispatch, options) { 
    return this.eventadorRemoveEventListener(event, dispatch, options);
}

EventTarget.prototype.addEventListener = function(event, dispatch, options) {
    let failedEvent = event;
    let failedDispatch = dispatch;
    let failedOptions = options;

    try {
        return Eventador.addListener(event, dispatch, options, this);
    } catch (e) {
        return this.eventadorAddEventListener(failedEvent, failedDispatch, failedOptions);
    }
}