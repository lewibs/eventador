import Eventador from "../modules/Eventador.js";

EventTarget.prototype.eventadorListener = function(event, callback, options) {
    return Eventador.addListener(this, event, callback, options);
}