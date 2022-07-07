import { v4 as uuidv4 } from 'uuid';
import keylogger from '../modules/Keylogger';
import historyInfo from '../modules/historyInfo';

const defaultOptions = ()=>{
    return Object.apply({}, { 
        capture:false,
        useCapture:false,
        requiredKeys:[],
        maxCalls:false,
    })
};

EventTarget.prototype.eventador = EventTarget.prototype.eventador || {};

EventTarget.prototype.eventador.events = EventTarget.prototype.eventador.events || {};

EventTarget.prototype.eventador.keylogger = EventTarget.prototype.eventador.keylogger || keylogger;

EventTarget.prototype.eventador.clasicRemoveEventListener = EventTarget.prototype.eventador.clasicRemoveEventListener || EventTarget.prototype.removeEventListener;

EventTarget.prototype.eventador.clasicAddEventListener = EventTarget.prototype.eventador.clasicAddEventListener || EventTarget.prototype.addEventListener;

EventTarget.prototype.eventador.removeEvent = EventTarget.prototype.eventador.removeEvent || function(target, id) {
    let event = target.events[id];
    event.removed = true;
    delete target.events[id];
    target.removeEventListener(event.trigger, event.event);
    return event;
}

EventTarget.prototype.removeEventListener = EventTarget.prototype.removeEventListener || function(event, func, options=defaultOptions()) {
    //backwards compatable :)
    if (typeof options === 'boolean') {
        let useCapture = options;
        options = defaultOptions();
        options.useCapture = useCapture;
    }

    console.warn('removeEventListener needs to get finished');
    this.eventador.clasicRemoveEventListener(event, func, options.useCapture);
}

EventTarget.prototype.addEventListener = function(event, func=()=>{}, options=defaultOptions()) {
    //backwards compatable :)
    if (typeof options === 'boolean') {
        let capture = options;
        options = defaultOptions();
        options.capture = capture;
    }

    let id = uuidv4();

    let dispatch = (e) => {
        e = Event.eventador.format();

        let keysPressed = 0;
        options.requiredKeys.forEach((k)=>{
            if (this.eventador.keylogger.pressedKeys[v]) {
                keysPressed++;
            }
        });

        let eventHistory = this.events[id];
        eventHistory.callTime = new Date().getTime();

        //triggered will run if required keys is empty too
        if (keysPressed === requiredKeys.length) {
            eventHistory.calls++;
            eventHistory.success = true;

            func(e);

            if (options.maxCalls !== false && options.maxCalls <= this.events[id].calls) {
                eventHistory = this.eventador.removeEvent(this, id);
            }
        } else {
            eventHistory.success = false;
        }

        this.eventador.keylogger.history.push(historyInfo(eventHistory));
    };

    this.events[id] = eventInfo({
        id:id,
        trigger: event,
        event: dispatch,
    });

    this.eventador.clasicAddEventListener(event, dispatch);

    return dispatch;
}