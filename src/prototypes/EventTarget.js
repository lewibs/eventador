import Eventador from "../modules/Eventador";

//this is added for use later by eventador
EventTarget.prototype.eventador = {};
EventTarget.prototype.eventador.clasicAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.clasicRemoveEventListener = EventTarget.prototype.removeEventListener;

//these are only to filter to eventador
EventTarget.prototype.removeEventListener = function(event, dispatch, options) { 
    return this.eventador.clasicRemoveEventListener(event, dispatch, options);
}

EventTarget.prototype.addEventListener = function(event, dispatch, options) {
    return Eventador.addListener(event, dispatch, options, this);
}